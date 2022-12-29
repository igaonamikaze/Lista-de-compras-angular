export interface Lista {
    id?: number, 
    nome?: string, 
    descricao?: string, 
    valor?: number,
    itens?: Item[]
}

export interface Item {
    id?: number,
    nomeItem?: String,
    quantidade?: number,
    valor?: number,
    total?: number,
    isChecked?:boolean
}