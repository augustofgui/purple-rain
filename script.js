document.addEventListener('DOMContentLoaded', () => {

    function init() {
        const canvas = document.querySelector("#canvas");
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;

        const canvasW = canvas.width;
        const canvasH = canvas.height;

        if (canvas.getContext) {
            setup();
            
        }
    }

    init();

    function setup() {
        canvas = document.querySelector("#canvas");

        const canvasW = canvas.width;
        const canvasH = canvas.height;

        const ctx = canvas.getContext('2d');

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const desenhaRetangulo = (ret) => {
            ctx.rotate(ret.r);
            ctx.beginPath();
            ctx.rect(ret.x, ret.y, ret.w, ret.h);
            ctx.fillStyle = ret.c;
            ctx.fill();
        }

        const ret = {
            x: 10,
            y: 100,
            w: 10,
            h: 100,
            r: -0.5,
            c: "#8ED6FF"
        }

        const criaRetanguloAleatorio = () => {
            const newRet = {};
            newRet.x = Math.floor(Math.random() * canvasW);
            newRet.y = Math.floor(Math.random() * canvasH);
            newRet.w = Math.floor(Math.random() * (20 - 5)) + 5;
            newRet.h = Math.floor(Math.random() * (200 - 20)) + 20;
            newRet.r = (Math.random() * (1 - 0.5) + 0.5) * -1;
            newRet.c = "#8ED6FF";

            return newRet;
        }

        const pincel = {
            ativo: false,
            movendo: false,
            pos: { x: 0, y: 0 },
            posAnterior: { x: null, y: null }
        }



        const desenharLinha = (linha) => {
            ctx.beginPath();
            ctx.moveTo(linha.posAnterior.x, linha.posAnterior.y);
            ctx.lineTo(linha.pos.x, linha.pos.y);
            ctx.stroke();
        }


        canvas.onmousedown = (evento) => { pincel.ativo = true };
        canvas.onmouseup = (evento) => { pincel.ativo = false };

        canvas.onmousemove = (evento) => {
            pincel.movendo = true;
            pincel.pos.x = evento.clientX;
            pincel.pos.y = evento.clientY;
        };

        const ciclo = () => {
            if (pincel.ativo && pincel.movendo && pincel.posAnterior) {
                desenharLinha({ pos: pincel.pos, posAnterior: pincel.posAnterior });
                pincel.movendo = false;
            }
            pincel.posAnterior = { x: pincel.pos.x, y: pincel.pos.y };
            
            setTimeout(ciclo, 1);
        };

        ciclo();
    }
});