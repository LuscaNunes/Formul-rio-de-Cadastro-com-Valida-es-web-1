document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("cadastroForm");
    const menoresIdadeSection = document.getElementById("menoresIdadeSection");

    // Função para validar CPF
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) return false;

        return true;
    }

    // Função para validar data de nascimento e calcular idade
    function validarDataNascimento(data) {
        const [ano, mes, dia] = data.split("-").map(Number); // Pega os valores da data
    
        const dataNasc = new Date(ano, mes - 1, dia);
        const hoje = new Date();
    
        let idade = hoje.getFullYear() - dataNasc.getFullYear();
    
        // Verifica se o aniversário ainda não ocorreu este ano
        if (hoje.getMonth() < dataNasc.getMonth() || 
           (hoje.getMonth() === dataNasc.getMonth() && hoje.getDate() < dataNasc.getDate())) {
            idade--;
        }
    
        return idade; // Retorna a idade corretamente
    }
    

    // Função para exibir/ocultar campos de menores de idade
    function toggleMenoresIdade(idadeValida) {
        if (!idadeValida) {
            menoresIdadeSection.style.display = "block";
            document.getElementById("nomePai").required = true;
            document.getElementById("nomeMae").required = true;
        } else {
            menoresIdadeSection.style.display = "none";
            document.getElementById("nomePai").required = false;
            document.getElementById("nomeMae").required = false;
        }
    }

    // Validar data de nascimento em tempo real
    document.getElementById("dataNascimento").addEventListener("input", function () {
        const dataNascimento = this.value;
        const idadeValida = validarDataNascimento(dataNascimento);
        toggleMenoresIdade(idadeValida);
    });
   
    function toggleMenoresIdade(idade) {
        const menoresIdadeSection = document.getElementById("menoresIdadeSection");
    
        if (idade < 18) {
            menoresIdadeSection.style.display = "block";
            document.getElementById("nomePai").required = true;
            document.getElementById("nomeMae").required = true;
        } else {
            menoresIdadeSection.style.display = "none";
            document.getElementById("nomePai").required = false;
            document.getElementById("nomeMae").required = false;
        }
    }

    // Validar o formulário ao enviar
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const erros = [];

        // Verificar se o usuário é menor de idade e se os campos de pais estão preenchidos
        const dataNascimento = document.getElementById("dataNascimento").value;
        const idadeValida = validarDataNascimento(dataNascimento);
        if (!idadeValida) {
            const nomePai = document.getElementById("nomePai").value;
            const nomeMae = document.getElementById("nomeMae").value;
            if (!nomePai || !nomeMae) {
                erros.push("Nome do Pai e Nome da Mãe são obrigatórios para menores de idade.");
            }
        }

        // Exibir erros em um alerta
        if (erros.length > 0) {
            alert("Por favor, corrija os seguintes erros:\n\n" + erros.join("\n"));
        } else {
            alert("Formulário enviado com sucesso!");
            form.submit(); // Ou envie os dados via AJAX
        }
    });
});