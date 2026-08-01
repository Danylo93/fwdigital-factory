#!/usr/bin/env python3
"""
Gera o catálogo comercial em PDF publicado em /catalogo.pdf.

Uso:
    python3 fontes-internas/gerar-catalogo.py

Os preços vêm de PLANOS abaixo — a mesma tabela que o gerador antigo em
src/components/CatalogGenerator.tsx usava. Aquele gerador vivia na rota
/admin do app React, que não é publicado: o site no ar é o index.html
estático. Por isso o catálogo virou um PDF de verdade, servido direto.

Ao mexer em preço, mexa aqui e rode de novo.
"""
import os

from reportlab.lib.colors import Color, HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

# ----------------------------------------------------------------- identidade
MAGENTA = HexColor("#ED145B")
MAGENTA_CLARO = HexColor("#F0417A")
FUNDO = HexColor("#0C0C0E")
CARTAO = HexColor("#141417")
BORDA = HexColor("#26262B")
TEXTO = HexColor("#FAFAFA")
TEXTO_FRACO = HexColor("#9AA0AA")

LARGURA, ALTURA = A4
MARGEM = 42

TELEFONE = "(11) 96489-1128"
EMAIL = "contato@agenciafwdigital.com.br"
ENDERECO = "Rua Crispim Gonçalves, 88 — São Paulo, SP"
SITE = "agenciafwdigital.com.br"
WHATSAPP = "https://wa.me/5511964891128"

# ------------------------------------------------------------------- conteúdo
PLANOS = [
    {
        "categoria": "Sites",
        "resumo": "Sua base digital: o endereço que trabalha por você 24 horas.",
        "itens": [
            ("Landing Page", "R$ 1.990", "Página única focada em uma oferta e uma ação.",
             ["Estrutura voltada para conversão", "Botão de WhatsApp em destaque",
              "Otimizada para o Google", "Responsiva em celular e desktop"]),
            ("Site Institucional", "R$ 3.990", "Várias páginas contando a história do seu negócio.",
             ["Até 6 páginas internas", "Formulário de contato", "Google Maps integrado",
              "Blog para publicar conteúdo"]),
            ("Loja Virtual", "R$ 6.990", "Venda direto pelo site, com pagamento e estoque.",
             ["Carrinho e checkout", "Pagamento online integrado", "Painel de produtos",
              "Relatórios de vendas"]),
        ],
    },
    {
        "categoria": "Aplicativos",
        "resumo": "Presença no celular do cliente, em iOS e Android.",
        "itens": [
            ("App Simples", "R$ 7.990", "Catálogo e pedidos na palma da mão.",
             ["Catálogo de produtos e serviços", "Pedidos e delivery",
              "Notificações push", "Publicação nas duas lojas"]),
            ("App com Backend", "R$ 10.990", "Com login, conta de cliente e conversa.",
             ["Cadastro e login de usuários", "Chat dentro do app",
              "Notificações segmentadas", "Integração com seus sistemas"]),
            ("App Sob Medida", "R$ 16.900", "Projetado do zero para a sua operação.",
             ["Marketplace ou operação completa", "Painel de gestão",
              "Integrações sob demanda", "Suporte dedicado"]),
        ],
    },
    {
        "categoria": "Automação com IA",
        "resumo": "Atendimento no WhatsApp que responde e qualifica sozinho.",
        "itens": [
            ("Bot Básico", "R$ 599/mês", "Responde as perguntas que mais se repetem.",
             ["Respostas automáticas", "Menu de opções", "Horário de atendimento",
              "Relatórios de conversas"]),
            ("Bot com IA", "R$ 999/mês", "Entende o que o cliente quer e conduz a conversa.",
             ["Inteligência artificial generativa", "Aprende com o histórico",
              "Atende em vários idiomas", "Relatórios detalhados"]),
            ("Bot Personalizado", "R$ 1.799/mês", "Integrado ao seu funil e à sua operação.",
             ["IA avançada com contexto do negócio", "Integração com CRM",
              "Automação de ponta a ponta", "Suporte prioritário"]),
        ],
    },
    {
        "categoria": "DevOps & Sustentação",
        "resumo": "O que mantém o que já está no ar rodando, seguro e rápido.",
        "itens": [
            ("Setup de Infraestrutura", "R$ 2.990", "A esteira montada uma vez, para nunca mais subir no braço.",
             ["Deploy automatizado a cada alteração", "Ambiente de homologação separado",
              "Domínio, DNS e certificado SSL", "Backup diário com restauração testada"]),
            ("Sustentação Essencial", "R$ 890/mês", "Alguém olhando enquanto você cuida do negócio.",
             ["Monitoramento e alerta de queda", "Atualizações de segurança",
              "Correção de falhas em produção", "Relatório mensal de disponibilidade"]),
            ("Sustentação Avançada", "R$ 2.490/mês", "Para quem já depende do sistema para faturar.",
             ["Tudo da Essencial", "Otimização de custo de nuvem",
              "Ajuste de escala e performance", "Atendimento prioritário a incidentes"]),
        ],
    },
    {
        "categoria": "Combos",
        "resumo": "Serviços combinados, com economia em relação ao avulso.",
        "itens": [
            ("Presença Digital", "R$ 5.990", "Tudo para existir bem na internet.",
             ["Site institucional completo", "Landing page de campanha",
              "Google Meu Negócio", "Configuração de redes sociais"]),
            ("Automação", "R$ 9.990", "O atendimento rodando sem você.",
             ["Site + bot com IA", "Integração com CRM",
              "Funil de vendas automatizado", "Painel de resultados"]),
            ("Empresarial", "R$ 22.500", "A operação digital inteira, de uma vez.",
             ["Site profissional", "App mobile", "Bot com IA", "Sistema de gestão"]),
        ],
    },
]

# O que acompanha qualquer contratação. Deixar isso explícito é prática dos
# concorrentes bem posicionados: sustenta o valor sem precisar baixar preço.
INCLUSO_SEMPRE = [
    "Design responsivo em celular, tablet e desktop",
    "Certificado SSL e hospedagem monitorada",
    "Otimização de performance e SEO técnico",
    "Treinamento de uso e suporte pós-entrega",
]

COMO_FUNCIONA = [
    ("1", "Diagnóstico", "Conversa gratuita para entender o negócio e o objetivo."),
    ("2", "Proposta", "Escopo, prazo e valor fechados por escrito, sem surpresa."),
    ("3", "Implementação", "Entrega em até 30 dias, com acompanhamento no caminho."),
    ("4", "Recorrência", "Manutenção, suporte e otimização contínua depois do ar."),
]


def registrar_fontes():
    """Usa Montserrat/Roboto se existirem no sistema; senão, Helvetica."""
    candidatos = {
        "Titulo": ["/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"],
        "Corpo": ["/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"],
    }
    achou = {}
    for nome, caminhos in candidatos.items():
        for c in caminhos:
            if os.path.exists(c):
                pdfmetrics.registerFont(TTFont(nome, c))
                achou[nome] = nome
                break
    return achou.get("Titulo", "Helvetica-Bold"), achou.get("Corpo", "Helvetica")


F_TIT, F_TXT = registrar_fontes()


def quebrar(c, texto, fonte, tam, largura_max):
    """Quebra por medida real da fonte — cortar por contagem de caracteres
    vazava da página, porque a largura depende das letras."""
    palavras = texto.split()
    linhas, atual = [], ""
    for p in palavras:
        teste = (atual + " " + p).strip()
        if c.stringWidth(teste, fonte, tam) <= largura_max:
            atual = teste
        else:
            if atual:
                linhas.append(atual)
            atual = p
    if atual:
        linhas.append(atual)
    return linhas


def fundo(c):
    c.setFillColor(FUNDO)
    c.rect(0, 0, LARGURA, ALTURA, stroke=0, fill=1)


def faixa_topo(c):
    c.setFillColor(MAGENTA)
    c.rect(0, ALTURA - 4, LARGURA, 4, stroke=0, fill=1)


def rodape(c, pagina):
    c.setFillColor(TEXTO_FRACO)
    c.setFont(F_TXT, 7.5)
    c.drawString(MARGEM, 26, f"{SITE}  ·  {TELEFONE}  ·  {EMAIL}")
    c.drawRightString(LARGURA - MARGEM, 26, f"{pagina}")
    c.setStrokeColor(BORDA)
    c.setLineWidth(0.5)
    c.line(MARGEM, 40, LARGURA - MARGEM, 40)


def desenhar_marca(c, x, y, tamanho, logo):
    if logo and os.path.exists(logo):
        c.drawImage(ImageReader(logo), x, y, width=tamanho, height=tamanho,
                    mask="auto", preserveAspectRatio=True)
        return x + tamanho + 10
    return x


def capa(c, logo):
    fundo(c)
    faixa_topo(c)

    # brilho de marca ao fundo — isolado, senão o alpha fica no estado
    # gráfico e apaga tudo que for desenhado depois, inclusive a marca
    c.saveState()
    for i in range(28):
        c.setFillColor(Color(0.93, 0.08, 0.36, alpha=0.020))
        c.circle(LARGURA * 0.78, ALTURA * 0.74, 250 - i * 8, stroke=0, fill=1)
    c.restoreState()

    prox = desenhar_marca(c, MARGEM, ALTURA - 118, 46, logo)
    c.setFillColor(TEXTO)
    c.setFont(F_TIT, 19)
    c.drawString(prox, ALTURA - 100, "FW")
    largura_fw = c.stringWidth("FW", F_TIT, 19)
    c.setFillColor(MAGENTA)
    c.drawString(prox + largura_fw, ALTURA - 100, "Digital")

    c.setFillColor(MAGENTA)
    c.setFont(F_TIT, 8)
    c.drawString(MARGEM, ALTURA - 175, "CATÁLOGO DE SERVIÇOS")

    c.setFillColor(TEXTO)
    c.setFont(F_TIT, 34)
    c.drawString(MARGEM, ALTURA - 230, "Planos e pacotes")
    c.drawString(MARGEM, ALTURA - 272, "para o seu negócio")

    c.setFillColor(TEXTO_FRACO)
    c.setFont(F_TXT, 11)
    texto = [
        "Sites que convertem, aplicativos, sistemas sob medida e",
        "automação de atendimento com IA no WhatsApp.",
    ]
    y = ALTURA - 312
    for l in texto:
        c.drawString(MARGEM, y, l)
        y -= 17

    # números de credibilidade
    y = ALTURA - 400
    col = (LARGURA - MARGEM * 2) / 4
    for i, (rotulo, valor) in enumerate([("Projetos entregues", "100+"),
                                         ("Anos de experiência", "10+"),
                                         ("Satisfação", "98%"),
                                         ("Entrega", "30 dias")]):
        x = MARGEM + col * i
        c.setFillColor(MAGENTA)
        c.setFont(F_TIT, 20)
        c.drawString(x, y, valor)
        c.setFillColor(TEXTO_FRACO)
        c.setFont(F_TXT, 8)
        c.drawString(x, y - 15, rotulo)

    # índice do catálogo
    c.setFillColor(TEXTO_FRACO)
    c.setFont(F_TIT, 8)
    c.drawString(MARGEM, ALTURA - 470, "NESTE CATÁLOGO")
    y = ALTURA - 500
    for i, cat in enumerate(PLANOS, start=2):
        menor = min(cat["itens"], key=lambda t: int(
            "".join(ch for ch in t[1] if ch.isdigit())))
        c.setFillColor(MAGENTA)
        c.setFont(F_TIT, 9)
        c.drawString(MARGEM, y, f"{i:02d}")
        c.setFillColor(TEXTO)
        c.setFont(F_TIT, 11)
        c.drawString(MARGEM + 24, y, cat["categoria"])
        c.setFillColor(TEXTO_FRACO)
        c.setFont(F_TXT, 8.5)
        c.drawRightString(LARGURA - MARGEM, y, f"a partir de {menor[1]}")
        c.setStrokeColor(BORDA)
        c.setLineWidth(0.4)
        c.line(MARGEM + 24, y - 9, LARGURA - MARGEM, y - 9)
        y -= 30

    # bloco de contato
    cx, cy, cw, ch = MARGEM, 96, LARGURA - MARGEM * 2, 96
    c.setFillColor(CARTAO)
    c.setStrokeColor(BORDA)
    c.roundRect(cx, cy, cw, ch, 6, stroke=1, fill=1)
    c.setFillColor(TEXTO)
    c.setFont(F_TIT, 11)
    c.drawString(cx + 18, cy + ch - 28, "Fale com um especialista")
    c.setFillColor(TEXTO_FRACO)
    c.setFont(F_TXT, 9)
    c.drawString(cx + 18, cy + ch - 48, f"WhatsApp {TELEFONE}   ·   {EMAIL}")
    c.drawString(cx + 18, cy + ch - 64, ENDERECO)
    c.setFillColor(MAGENTA)
    c.setFont(F_TXT, 9)
    c.drawString(cx + 18, cy + ch - 82, "Consultoria inicial gratuita e sem compromisso")

    rodape(c, "")
    c.showPage()


def cartao_plano(c, x, y, w, h, nome, preco, resumo, itens):
    c.setFillColor(CARTAO)
    c.setStrokeColor(BORDA)
    c.setLineWidth(0.6)
    c.roundRect(x, y, w, h, 5, stroke=1, fill=1)

    # filete de marca no topo do cartão
    c.setFillColor(MAGENTA)
    c.rect(x, y + h - 2.4, w, 2.4, stroke=0, fill=1)

    c.setFillColor(TEXTO)
    c.setFont(F_TIT, 11.5)
    c.drawString(x + 14, y + h - 26, nome)

    c.setFillColor(MAGENTA)
    c.setFont(F_TIT, 14)
    c.drawRightString(x + w - 14, y + h - 26, preco)

    c.setFillColor(TEXTO_FRACO)
    c.setFont(F_TXT, 8.2)
    c.drawString(x + 14, y + h - 42, resumo[:88])

    yy = y + h - 62
    for it in itens:
        c.setFillColor(MAGENTA)
        c.setFont(F_TXT, 8)
        c.drawString(x + 14, yy, "•")
        c.setFillColor(TEXTO)
        c.setFont(F_TXT, 8.2)
        c.drawString(x + 24, yy, it[:74])
        yy -= 13


def pagina_categoria(c, cat, pagina, logo):
    fundo(c)
    faixa_topo(c)

    prox = desenhar_marca(c, MARGEM, ALTURA - 78, 22, logo)
    c.setFillColor(TEXTO_FRACO)
    c.setFont(F_TXT, 8)
    c.drawString(prox, ALTURA - 70, "FWDigital · Catálogo de serviços")

    c.setFillColor(MAGENTA)
    c.setFont(F_TIT, 8)
    c.drawString(MARGEM, ALTURA - 112, cat["categoria"].upper())
    c.setFillColor(TEXTO)
    linhas = quebrar(c, cat["resumo"], F_TIT, 19, LARGURA - MARGEM * 2)
    yy = ALTURA - 138
    c.setFont(F_TIT, 19)
    for l in linhas[:2]:
        c.drawString(MARGEM, yy, l)
        yy -= 24

    c.setStrokeColor(BORDA)
    c.setLineWidth(0.5)
    c.line(MARGEM, yy - 4, LARGURA - MARGEM, yy - 4)

    w = LARGURA - MARGEM * 2
    h = 128
    y = yy - 4 - 24 - h
    for nome, preco, resumo, itens in cat["itens"]:
        cartao_plano(c, MARGEM, y, w, h, nome, preco, resumo, itens)
        y -= h + 16

    # o que acompanha qualquer plano da página.
    # Ancorado em posição fixa acima do rodapé: derivar do fim dos cartões
    # fazia a faixa descer junto e colidir com ele.
    y = 118
    c.setFillColor(MAGENTA)
    c.setFont(F_TIT, 8)
    c.drawString(MARGEM, y, "TODO PROJETO INCLUI")
    y -= 18
    meio = LARGURA / 2
    for i, item in enumerate(INCLUSO_SEMPRE):
        col_x = MARGEM if i % 2 == 0 else meio
        if i % 2 == 0 and i:
            y -= 16
        c.setFillColor(MAGENTA)
        c.setFont(F_TXT, 8)
        c.drawString(col_x, y, "•")
        c.setFillColor(TEXTO_FRACO)
        c.drawString(col_x + 10, y, item)

    rodape(c, pagina)
    c.showPage()


def pagina_processo(c, pagina, logo):
    fundo(c)
    faixa_topo(c)

    prox = desenhar_marca(c, MARGEM, ALTURA - 78, 22, logo)
    c.setFillColor(TEXTO_FRACO)
    c.setFont(F_TXT, 8)
    c.drawString(prox, ALTURA - 70, "FWDigital · Catálogo de serviços")

    c.setFillColor(MAGENTA)
    c.setFont(F_TIT, 8)
    c.drawString(MARGEM, ALTURA - 112, "COMO FUNCIONA")
    c.setFillColor(TEXTO)
    c.setFont(F_TIT, 24)
    c.drawString(MARGEM, ALTURA - 142, "Do primeiro contato ao no ar")

    c.setStrokeColor(BORDA)
    c.line(MARGEM, ALTURA - 160, LARGURA - MARGEM, ALTURA - 160)

    y = ALTURA - 210
    for num, titulo, desc in COMO_FUNCIONA:
        c.setFillColor(MAGENTA)
        c.circle(MARGEM + 12, y + 4, 12, stroke=0, fill=1)
        c.setFillColor(TEXTO)
        c.setFont(F_TIT, 10)
        c.drawCentredString(MARGEM + 12, y + 1, num)

        c.setFillColor(TEXTO)
        c.setFont(F_TIT, 12)
        c.drawString(MARGEM + 36, y + 6, titulo)
        c.setFillColor(TEXTO_FRACO)
        c.setFont(F_TXT, 9)
        c.drawString(MARGEM + 36, y - 9, desc)
        y -= 52

    # modelo de contratação
    y -= 6
    cw = LARGURA - MARGEM * 2
    c.setFillColor(CARTAO)
    c.setStrokeColor(BORDA)
    c.roundRect(MARGEM, y - 96, cw, 96, 5, stroke=1, fill=1)
    c.setFillColor(TEXTO)
    c.setFont(F_TIT, 11)
    c.drawString(MARGEM + 16, y - 26, "Modelo de contratação")
    c.setFillColor(TEXTO_FRACO)
    c.setFont(F_TXT, 9)
    for i, l in enumerate([
        "Implementação: valor único para colocar a solução no ar.",
        "Recorrência: mensalidade de manutenção, hospedagem monitorada,",
        "suporte e otimizações contínuas baseadas nos seus dados.",
    ]):
        c.drawString(MARGEM + 16, y - 46 - i * 14, l)

    # observações honestas sobre o orçamento
    y -= 128
    c.setFillColor(TEXTO_FRACO)
    c.setFont(F_TXT, 7.6)
    for i, l in enumerate([
        "Os valores acima são o ponto de partida de cada categoria e cobrem o escopo descrito.",
        "Projetos com integrações específicas, migração de dados ou volume fora do padrão são",
        "orçados após o diagnóstico. Nenhum serviço começa sem escopo e valor aprovados por escrito.",
    ]):
        c.drawString(MARGEM, y - i * 11, l)

    rodape(c, pagina)
    c.showPage()


def pagina_final(c, logo):
    fundo(c)
    faixa_topo(c)

    c.saveState()
    for i in range(30):
        c.setFillColor(Color(0.93, 0.08, 0.36, alpha=0.018))
        c.circle(LARGURA / 2, ALTURA * 0.58, 260 - i * 8, stroke=0, fill=1)
    c.restoreState()

    if logo and os.path.exists(logo):
        c.drawImage(ImageReader(logo), LARGURA / 2 - 30, ALTURA - 190, width=60, height=60,
                    mask="auto", preserveAspectRatio=True)

    c.setFillColor(TEXTO)
    c.setFont(F_TIT, 28)
    c.drawCentredString(LARGURA / 2, ALTURA - 250, "Vamos começar?")

    c.setFillColor(TEXTO_FRACO)
    c.setFont(F_TXT, 11)
    for i, l in enumerate([
        "A consultoria inicial é gratuita e sem compromisso.",
        "Conte o seu objetivo e devolvemos um plano com escopo, prazo e valor.",
    ]):
        c.drawCentredString(LARGURA / 2, ALTURA - 290 - i * 18, l)

    # botão
    bw, bh = 260, 44
    bx, by = LARGURA / 2 - bw / 2, ALTURA - 400
    c.setFillColor(MAGENTA)
    c.roundRect(bx, by, bw, bh, 5, stroke=0, fill=1)
    c.setFillColor(HexColor("#FFFFFF"))
    c.setFont(F_TIT, 12)
    c.drawCentredString(LARGURA / 2, by + 16, "Falar no WhatsApp")
    c.linkURL(WHATSAPP, (bx, by, bx + bw, by + bh), relative=0)

    c.setFillColor(TEXTO)
    c.setFont(F_TXT, 10)
    y = ALTURA - 470
    for l in [TELEFONE, EMAIL, SITE, ENDERECO]:
        c.drawCentredString(LARGURA / 2, y, l)
        y -= 18

    c.setFillColor(TEXTO_FRACO)
    c.setFont(F_TXT, 7.5)
    c.drawCentredString(LARGURA / 2, 60,
                        "Valores válidos por 30 dias a partir da data de emissão deste catálogo.")
    rodape(c, "")
    c.showPage()


def main():
    logo = None
    for cand in ["assets/brand/fw-mark-512.png", "assets/brand/fw-mark-180.png",
                 "assets/brand/fw-logo.png"]:
        if os.path.exists(cand):
            logo = cand
            break

    saida = "catalogo.pdf"
    c = canvas.Canvas(saida, pagesize=A4)
    c.setTitle("Catálogo de Serviços — Agência FW Digital")
    c.setAuthor("Agência FW Digital")
    c.setSubject("Planos e pacotes: sites, apps, sistemas e automação com IA")

    capa(c, logo)
    n = 2
    for cat in PLANOS:
        pagina_categoria(c, cat, str(n), logo)
        n += 1
    pagina_processo(c, str(n), logo)
    pagina_final(c, logo)
    c.save()

    print(f"{saida} · {os.path.getsize(saida)/1024:.0f} KB · {n + 1} páginas")
    print(f"logo usada: {logo or 'nenhuma'}")


if __name__ == "__main__":
    main()
