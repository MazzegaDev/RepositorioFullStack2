import Base from "./base.js";

export default class AluguelEntity extends Base {
  #id;
  #mes;
  #vencimento;
  #valor;
  #pago;
  #contrato;

  get id() {
    return this.#id;
  }
  set id(id) {
    this.#id = id;
  }

  get mes() {
    return this.#mes;
  }
  set mes(mes) {
    this.#mes = mes;
  }

  get vencimento() {
    return this.#vencimento;
  }
  set vencimento(venc) {
    this.#vencimento = venc;
  }

  get valor() {
    return this.#valor;
  }
  set valor(valor) {
    this.#valor = valor;
  }

  get pago() {
    return this.#pago;
  }
  set pago(pago){
    this.#pago = pago;
  }
  
  get contrato(){
    return this.#contrato;
  }
  set contrato(contrato){
    this.#contrato = contrato
  }

  constructor(id, mes, vencimento, valor, pago, contrato){
    super();
    this.#id = id;
    this.#mes = mes;
    this.#vencimento = vencimento;
    this.#valor = valor;
    this.#pago = pago;
    this.#contrato = contrato;
  }
}
