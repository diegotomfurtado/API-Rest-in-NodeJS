module.exports = function ValidationError(message){
    this.nome = 'ValidationError';
    this.message = message
};