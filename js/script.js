(function () {
    function inicializarControleQuantidade() {
        const controle = document.querySelector("#controle-quantidade");
        if (!controle) return;

        const quantidadeInput = document.querySelector("#quantidade-produto");
        const subtotal = document.querySelector("#subtotal-produto");
        const precoUnitario = Number(document.querySelector("#preco-produto").dataset.preco);
        if (!quantidadeInput || !subtotal || !Number.isFinite(precoUnitario)) return;

        const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        const atualizarSubtotal = () => {
            const valorInformado = Number.parseInt(quantidadeInput.value, 10);
            const quantidade = Math.min(99, Math.max(1, Number.isNaN(valorInformado) ? 1 : valorInformado));

            quantidadeInput.value = quantidade;
            subtotal.textContent = formatadorMoeda.format(precoUnitario * quantidade);
            controle.querySelector('[data-quantity-change="-1"]').disabled = quantidade === 1;
        };

        controle.addEventListener("click", (evento) => {
            const botao = evento.target.closest("[data-quantity-change]");
            if (!botao || !controle.contains(botao)) return;

            const quantidadeAtual = Number.parseInt(quantidadeInput.value, 10) || 1;
            quantidadeInput.value = quantidadeAtual + Number(botao.dataset.quantityChange);
            atualizarSubtotal();
        });

        quantidadeInput.addEventListener("input", atualizarSubtotal);
        quantidadeInput.addEventListener("change", atualizarSubtotal);
        atualizarSubtotal();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", inicializarControleQuantidade);
    } else {
        inicializarControleQuantidade();
    }

    if (window.jQuery) {
        window.jQuery(function ($) {
            const meses = [
                "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
            ];
            const mesesCurtos = [
                "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"
            ];

            if ($.fn.datepicker && $("#nascimento").length) {
                $("#nascimento").datepicker({
                    dateFormat: "dd/mm/yy",
                    changeMonth: true,
                    changeYear: true,
                    yearRange: "-100:+0",
                    maxDate: 0,
                    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
                    monthNames: meses,
                    monthNamesShort: mesesCurtos
                });
            }

            if ($.fn.accordion && $("#accordion").length) {
                $("#accordion").accordion({
                    heightStyle: "content",
                    collapsible: true
                });
            }
        });
    }

    const temporizadoresEfeito = new WeakMap();
    const ativarEfeitoClique = (elemento) => {
        clearTimeout(temporizadoresEfeito.get(elemento));
        elemento.classList.remove("efeito-clique--ativo");
        void elemento.offsetWidth;
        elemento.classList.add("efeito-clique--ativo");

        temporizadoresEfeito.set(elemento, setTimeout(() => {
            elemento.classList.remove("efeito-clique--ativo");
        }, 420));
    };

    document.addEventListener("pointerdown", (evento) => {
        if (evento.button !== 0 || !(evento.target instanceof Element)) return;
        const elemento = evento.target.closest(".efeito-clique");
        if (elemento) ativarEfeitoClique(elemento);
    });

    document.addEventListener("click", (evento) => {
        if (evento.detail !== 0 || !(evento.target instanceof Element)) return;
        const elemento = evento.target.closest(".efeito-clique");
        if (elemento) ativarEfeitoClique(elemento);
    });
})();