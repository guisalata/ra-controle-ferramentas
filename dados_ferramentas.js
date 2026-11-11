/* ============================================================================
 *  dados_ferramentas.js
 *  Base de dados de ferramentas (exportada do sistema de controle em Electron).
 *  Em produção este objeto seria servido pela API/JSON do próprio sistema;
 *  aqui é um recorte estático para a demonstração de Realidade Aumentada.
 *  Projeto: Fábrica de Empilhadeiras Automáticas – Setor de Usinagem – Grupo 01
 * ==========================================================================*/
window.FERRAMENTAS = {
  /* marcador mk1 ---------------------------------------------------------- */
  mk1: {
    codigo: "FER-001",
    nome: "Inserto CNMG 120408",
    categoria: "Ferramenta de corte (torno)",
    setor: "Usinagem",
    equipamento: "Torno CNC Haas ST-10",
    local: "Almoxarifado • Gaveta A-03",
    unidade: "un",
    estoqueAtual: 3,
    estoqueMinimo: 10,
    calibracao: null,
    compra: { situacao: "Pendente", documento: "RC-2045", data: "2026-11-05" },
    historico: [
      { data: "2026-11-08", tipo: "Saída",   qtd: 2, resp: "K. Sousa" },
      { data: "2026-11-04", tipo: "Saída",   qtd: 3, resp: "E. Watanabe" },
      { data: "2026-10-28", tipo: "Entrada", qtd: 8, resp: "Almoxarifado" }
    ]
  },
  /* marcador mk2 ---------------------------------------------------------- */
  mk2: {
    codigo: "FER-014",
    nome: "Fresa de topo Ø10 mm – 4 cortes",
    categoria: "Ferramenta de corte (fresamento)",
    setor: "Usinagem",
    equipamento: "Centro de Usinagem Haas VF-2",
    local: "Bancada de Usinagem • Painel B",
    unidade: "un",
    estoqueAtual: 12,
    estoqueMinimo: 6,
    calibracao: null,
    compra: { situacao: "—", documento: null, data: null },
    historico: [
      { data: "2026-11-07", tipo: "Entrada", qtd: 6, resp: "Almoxarifado" },
      { data: "2026-11-01", tipo: "Saída",   qtd: 2, resp: "H. Moreira" }
    ]
  },
  /* marcador mk3 ---------------------------------------------------------- */
  mk3: {
    codigo: "INS-220",
    nome: "Paquímetro digital 150 mm",
    categoria: "Instrumento de medição",
    setor: "Metrologia",
    equipamento: "—",
    local: "Metrologia • Armário M-1",
    unidade: "un",
    estoqueAtual: 2,
    estoqueMinimo: 2,
    calibracao: { validade: "2026-09-15", situacao: "Vencida" },
    compra: { situacao: "—", documento: null, data: null },
    historico: [
      { data: "2026-11-06", tipo: "Saída",   qtd: 1, resp: "Qualidade" },
      { data: "2026-09-15", tipo: "Calibração", qtd: 0, resp: "RBC/INMETRO" }
    ]
  }
};

/* Regra de status (igual à usada no dashboard do sistema) -------------------
 * CRÍTICO  : estoque <= 50% do mínimo
 * ATENÇÃO  : calibração vencida  OU  estoque <= mínimo
 * OK       : demais casos
 * --------------------------------------------------------------------------*/
window.calcularStatus = function (f) {
  if (f.estoqueAtual <= Math.ceil(f.estoqueMinimo * 0.5))
    return { nivel: "CRITICO", rotulo: "CRÍTICO – repor", cor: "#e5484d" };
  if (f.calibracao && f.calibracao.situacao === "Vencida")
    return { nivel: "ATENCAO", rotulo: "ATENÇÃO – calibração vencida", cor: "#f5a623" };
  if (f.estoqueAtual <= f.estoqueMinimo)
    return { nivel: "ATENCAO", rotulo: "ATENÇÃO – estoque baixo", cor: "#f5a623" };
  return { nivel: "OK", rotulo: "OK", cor: "#30a46c" };
};
