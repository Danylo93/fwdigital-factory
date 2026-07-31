#!/usr/bin/env python3
"""
Converte um vídeo do hero nos dois conjuntos de quadros que o site usa.

Uso:
    python3 fontes-internas/gerar-quadros.py caminho/do/video.mp4

Gera:
    assets/cinema/frames/hero/w_XXXX.webp          paisagem, para desktop
    assets/cinema/frames/hero-mobile/m_XXXX.webp   recorte 9:16, para celular
    assets/cinema/poster/hero.jpg                  primeiro quadro (é o LCP)

Depois de rodar, ajuste FRAME_COUNT em assets/app.js para os números impressos
no fim — o site precisa saber quantos quadros existem em cada conjunto.

Requer: pip install imageio-ffmpeg Pillow
(o ffmpeg do Playwright não serve: é uma build mínima, sem demuxer de mp4)
"""
import os
import shutil
import subprocess
import sys
import tempfile

from PIL import Image

# Quantos quadros cada conjunto recebe. Mais quadros = rolagem mais fluida e
# movimento ambiente mais convincente, ao custo de banda.
QUADROS_DESKTOP = 61
QUADROS_MOBILE = 41

# Altura máxima de cada conjunto. O celular em retrato precisa de bem mais
# altura que o desktop: é a dimensão que limita a nitidez ao cobrir a tela.
ALTURA_DESKTOP = 1080
ALTURA_MOBILE = 1600

QUALIDADE_DESKTOP = 80
QUALIDADE_MOBILE = 78


def extrair(video, destino):
    ffmpeg = __import__("imageio_ffmpeg").get_ffmpeg_exe()
    subprocess.run(
        [ffmpeg, "-hide_banner", "-loglevel", "error", "-i", video,
         "-vsync", "0", os.path.join(destino, "src_%05d.png")],
        check=True,
    )
    return sorted(os.listdir(destino))


def escrever_conjunto(brutos, pasta, prefixo, alvo_n, altura, qualidade, recorte_916):
    if os.path.isdir(pasta):
        shutil.rmtree(pasta)
    os.makedirs(pasta, exist_ok=True)

    passo = max(1, len(brutos) // alvo_n)
    escolhidos = brutos[::passo][:alvo_n]
    total = 0
    for i, nome in enumerate(escolhidos, start=1):
        im = Image.open(nome).convert("RGB")
        if recorte_916:
            larg = int(im.height * 9 / 16)
            if larg < im.width:
                x = (im.width - larg) // 2
                im = im.crop((x, 0, x + larg, im.height))
        if im.height != altura:
            nova_larg = round(im.width * altura / im.height)
            im = im.resize((nova_larg, altura), Image.LANCZOS)
        saida = os.path.join(pasta, f"{prefixo}_{i:04d}.webp")
        im.save(saida, "WEBP", quality=qualidade, method=5)
        total += os.path.getsize(saida)
    return len(escolhidos), total, im.size


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    video = sys.argv[1]
    if not os.path.isfile(video):
        sys.exit(f"vídeo não encontrado: {video}")

    with tempfile.TemporaryDirectory() as tmp:
        nomes = [os.path.join(tmp, n) for n in extrair(video, tmp)]
        if not nomes:
            sys.exit("o ffmpeg não extraiu nenhum quadro")
        print(f"{len(nomes)} quadros extraídos · {Image.open(nomes[0]).size}")

        n_d, b_d, dim_d = escrever_conjunto(
            nomes, "assets/cinema/frames/hero", "w",
            QUADROS_DESKTOP, ALTURA_DESKTOP, QUALIDADE_DESKTOP, recorte_916=False)
        n_m, b_m, dim_m = escrever_conjunto(
            nomes, "assets/cinema/frames/hero-mobile", "m",
            QUADROS_MOBILE, ALTURA_MOBILE, QUALIDADE_MOBILE, recorte_916=True)

        os.makedirs("assets/cinema/poster", exist_ok=True)
        poster = Image.open(nomes[0]).convert("RGB")
        if poster.height > ALTURA_DESKTOP:
            poster = poster.resize(
                (round(poster.width * ALTURA_DESKTOP / poster.height), ALTURA_DESKTOP),
                Image.LANCZOS)
        poster.save("assets/cinema/poster/hero.jpg", quality=86,
                    optimize=True, progressive=True)

    print(f"desktop: {n_d} quadros {dim_d[0]}x{dim_d[1]} · {b_d/1024/1024:.2f} MB")
    print(f"celular: {n_m} quadros {dim_m[0]}x{dim_m[1]} · {b_m/1024/1024:.2f} MB")
    print(f"poster:  {poster.size[0]}x{poster.size[1]}")
    print()
    print("Agora ajuste em assets/app.js:")
    print(f"  var FRAME_COUNT = ehRetrato ? {n_m} : {n_d};")
    print("E confira o width/height do #heroPoster em index.html.")


if __name__ == "__main__":
    main()
