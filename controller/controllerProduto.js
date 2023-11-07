/******
 * Objetivo: Arquivo de controle dos dados da tabela produto em nosso sistema
 * Data: 07/11/23
 * Autores: Claudio Sousa
 * Versão: 1.0
 ******/

var produtoDAO = require('../model/DAO/produtoDAO.js')
var categoriaProdutoDAO = require('../model/DAO/categoria_produtoDAO.js')
var academiaDAO = require('../model/DAO/academiaDAO.js')

var message = require('./modulo/config.js') 


const getProduto =  async () => {
    
    let dadosProdutoJSON = {}

    let dadosProduto = await produtoDAO.selectAllProduto()

    if(dadosProduto){
        dadosProdutoJSON.status = message.SUCCESS_REQUEST.status
        dadosProdutoJSON.message = message.SUCCESS_REQUEST.message
        dadosProdutoJSON.produtos = dadosProduto

        return dadosProdutoJSON
    }else{
        return message.ERROR_NOT_FOUND
    }
}

const getProdutoById = async (idProduto) => {

    let dadosProdutoJSON = {}

    if(idProduto == '' || idProduto == undefined || isNaN(idProduto)){
        return message.ERROR_INVALID_ID
    }else{

        let dadosProduto = await produtoDAO.selectProdutoById(idProduto)

        if(dadosProduto){
            dadosProdutoJSON.status = message.SUCCESS_REQUEST.status
            dadosProdutoJSON.message = message.SUCCESS_REQUEST.message
            dadosProdutoJSON.produto = dadosProduto
    
            return dadosProdutoJSON
        }else{
            return message.ERROR_NOT_FOUND
        }

    }
}
// dadosProduto.nome == ''|| dadosProduto.nome == undefined || dadosProduto.nome.length > 45 || !isNaN(dadosProduto.nome) || 
//         dadosProduto.descricao.length > 120 || dadosProduto.codigo.length > 10 || !isNaN(dadosProduto.codigo) || 
//         dadosProduto.preco == '' || dadosProduto.preco == undefined || dadosProduto.preco.length > 12 || !isNaN(dadosProduto.preco) || 
//         dadosProduto.status == '' || dadosProduto.status == undefined || dadosProduto.status > 15 || !isNaN(dadosProduto.status) || 
//         dadosProduto.id_academia == '' || dadosProduto.id_academia == undefined || isNaN(dadosProduto.id_academia)  ||
//         dadosProduto.id_categoria_produto == '' || dadosProduto.id_categoria_produto == undefined || isNaN(dadosProduto.id_categoria_produto)  

const inserirProduto =  async (dadosProduto) => {
    let dadosProdutoJSON = {}

    if(
        dadosProduto.nome == ''|| dadosProduto.nome == undefined || dadosProduto.nome.length > 45 || 
        dadosProduto.descricao.length > 120 || dadosProduto.codigo.length > 10 || 
        dadosProduto.preco == '' || dadosProduto.preco == undefined || dadosProduto.preco.length > 12 || 
        dadosProduto.status == '' || dadosProduto.status == undefined || dadosProduto.status > 15 ||  
        dadosProduto.id_academia == '' || dadosProduto.id_academia == undefined || isNaN(dadosProduto.id_academia)  ||
        dadosProduto.id_categoria_produto == '' || dadosProduto.id_categoria_produto == undefined || isNaN(dadosProduto.id_categoria_produto)  
    ){
        return message.ERROR_REQUIRED_FIELDS   
    }else{
        
        let testeIdAcademia = await academiaDAO.selectAcademiaById(dadosProduto.id_academia)
        let testeIdCategoriaProduto = await categoriaProdutoDAO.selectCategoriaProdutoById(dadosProduto.id_categoria_produto)

        if(testeIdAcademia && testeIdCategoriaProduto){
            let resultadoProduto = await produtoDAO.insertProduto(dadosProduto)

            if(resultadoProduto){
                let novaProduto = await produtoDAO.selectLastId()
                dadosProdutoJSON.status = message.SUCCESS_REQUEST.status
                dadosProdutoJSON.message = message.SUCCESS_REQUEST.message
                dadosProdutoJSON.produto = novaProduto
        
                return dadosProdutoJSON
            }else{
                return message.ERROR_INTERNAL_SERVER
            }
        }else{
            return message.ERROR_INVALID_ID
        }

    }
}

const atualizarProduto = async (idProduto, dadosProduto) => {
    let dadosProdutoJSON = {}

    if(
        dadosProduto.nome == ''|| dadosProduto.nome == undefined || dadosProduto.nome.length > 45 || 
        dadosProduto.descricao.length > 120 || dadosProduto.codigo.length > 10 || 
        dadosProduto.preco == '' || dadosProduto.preco == undefined || dadosProduto.preco.length > 12 || 
        dadosProduto.status == '' || dadosProduto.status == undefined || dadosProduto.status > 15 ||  
        dadosProduto.id_academia == '' || dadosProduto.id_academia == undefined || isNaN(dadosProduto.id_academia)  ||
        dadosProduto.id_categoria_produto == '' || dadosProduto.id_categoria_produto == undefined || isNaN(dadosProduto.id_categoria_produto)  
    ){
        return message.ERROR_REQUIRED_FIELDS   
    }else if(idProduto == '' || idProduto == undefined || isNaN(idProduto)){
        return message.ERROR_INVALID_ID
    }else{
        
        let testeIdAcademia = await academiaDAO.selectAcademiaById(dadosProduto.id_academia)
        let testeIdCategoriaProduto = await categoriaProdutoDAO.selectCategoriaProdutoById(dadosProduto.id_categoria_produto)

        if(testeIdAcademia && testeIdCategoriaProduto){
            dadosProduto.id = idProduto
            let resultadoProduto = await produtoDAO.updateProduto(dadosProduto)

            if(resultadoProduto){
                
                dadosProdutoJSON.status = message.SUCCESS_REQUEST.status
                dadosProdutoJSON.message = message.SUCCESS_REQUEST.message
                dadosProdutoJSON.produto = dadosProduto
        
                return dadosProdutoJSON
            }else{
                return message.ERROR_INTERNAL_SERVER
            }
        }else{
            return message.ERROR_INVALID_ID
        }

    }
}

module.exports = {
    getProduto,
    getProdutoById,
    inserirProduto,
    atualizarProduto
}