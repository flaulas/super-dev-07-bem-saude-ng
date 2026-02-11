// GET /pacientes
export interface PacienteResponseModel{
    id: string;
    nome: string;
    cpf: string;
    telefone: string;
    status: boolean;
}

// POST /pacientes
export interface PacienteCriarRequestModel{
    nome: string;
    cpf: string;
    telefone: string;
    endereco: string;
    email: string;
    data_nascimento: string;
    observacoes: string;
}

// PUT /pacientes/{id}
export interface PacienteEditarRequestModel{
    nome: string;
    telefone: string;
    endereco: string;
    email: string;
    observacoes: string;
}

// GET /pacientes/{id}
export interface PacientePesquisaResponseModel{
    id: string;
    nome: string;
    cpf: string;
    telefone: string;
    endereco: string;
    email: string;
    data_nascimento: string;
    observacoes: string;
    status: boolean;
}
