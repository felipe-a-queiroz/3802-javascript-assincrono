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

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tag = inputTags.value.trim();
        try {
            if (tag && await verificaTagsDisponiveis(tag)) {
                adicionarTag(tag);
                inputTags.value = "";
            }
        } catch (error) {
            console.error("Erro ao verificar a tag:", error);
            alert("Erro ao verificar a tag. Verifique o console para mais detalhes.");
        }
    }
});

function adicionarTag(tag) {
    const novaTag = document.createElement("li");
    const textoItem = document.createElement("p");
    const imagemRemover = document.createElement("img");

    textoItem.textContent = tag;
    imagemRemover.src = "./img/close-black.svg";
    imagemRemover.classList.add("close-tag");

    novaTag.appendChild(textoItem);
    novaTag.appendChild(imagemRemover);
    listaTags.appendChild(novaTag);
}

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("close-tag")) {
        const itemTag = evento.target.parentElement;
        listaTags.removeChild(itemTag);
    }
})

const tagsDisponiveis = ["front-end", "programação", "data science", "back-end", "devops", "mobile", "design", "ux/ui", "machine learning", "inteligência artificial"];

async function verificaTagsDisponiveis(tag) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tag));
        }, 1000);
    });
}
