const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name });
        }
        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`);
        }

        leitor.readAsDataURL(arquivo);
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];
    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error(erro);
            alert("Erro ao carregar a imagem. Verifique o console para mais detalhes.");
        }
    }
})

const inputTags = document.getElementById("input-tags");
const listaTags = document.querySelector(".lista-tags");

inputTags.addEventListener("keypress", (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tag = inputTags.value.trim();
        if (tag) {
            adicionarTag(tag);
            inputTags.value = "";
        }
    }
});

function adicionarTag(tag) {
    const novaTag = document.createElement("li");
    const textoItem = document.createElement("p");
    const imagemRemover = document.createElement("img");

    textoItem.textContent = tag;
    imagemRemover.src = "./img/close-black.svg";

    novaTag.appendChild(textoItem);
    novaTag.appendChild(imagemRemover);
    listaTags.appendChild(novaTag);
}