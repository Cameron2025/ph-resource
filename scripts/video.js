
const loadCategories= () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error)
    )
};

const loadVideos= (searchText ="") =>{
fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?tittle=${searchText}`)
    .then((res) => res.json())
    .then(data => displayVideos(data.videos))
    .catch(error => console.log(error));
};

const loadCategoriesVideo = (id) =>{
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then(data => {
        removeActiveClass();
        const activeBtn = document.getElementById(`btn${id}`); 
        activeBtn.classList.add("active");
        displayVideos(data.category);
    })
    .catch(error => console.log(error));
};


const loadDetails = async(videoId) =>{
    console.log(videoId);
    const uri =`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(uri);
    const data = await res.json();
    console.log(data);
    displayDetails(data.video);
}

const displayDetails =(video)=>{
console.log(video);
const detailsContainer = document.getElementById("modal-content");
detailsContainer.innerHTML = `
<img src = ${video.thumbnail}/>
<p>${video.description}</p>
`
document.getElementById("showModalData").click();
}


const removeActiveClass =() =>{
    const buttons =document.getElementsByClassName("category-btn");
    console.log(buttons);
    for (let btn of buttons){
        btn.classList.remove("active");
    }
};

function getTimeString(time){
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second age`;
} ;
// remove active buttons

const cardDemo ={
    "category_id": "1001",
    "video_id": "aaaa",
    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    "title": "Shape of You",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
            "profile_name": "Olivia Mitchell",
            "verified": ""
        }
    ],
    "others": {
        "views": "100K",
        "posted_date": "16278"
    },
    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
};
// load videos =>
const displayVideos = (videos) =>{
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";

    if( videos.length == 0){
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML = `
        <div class="min-h-[100px] flex flex-col gap-5 justify-center items-center">
        <img src="ASSERT.Icon.png"/> 
        <h2 class='text-center text-xl text-bold'>
        No Content Here
        </h2>
        </div>

        `}else{
            videoContainer.classList.add("grid");
        }

    videos.forEach((video) => {
        // console.log(video);

        const card = document.createElement('div');
        card.classList='card';
        card.innerHTML = `
    <figure class = "h-[200px] relative">
        <img
        src="${video.thumbnail}"
        class="h-full w-full object-cover"
        alt="Shoes" />
        ${
            video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 text-white bg-black p-2">
        ${
            getTimeString(video.others.posted_date)
        }`
        }
        
        </span>
    </figure>
    <div class="px-0 py-2 flex gap-2">
        <div>
        <img class="h-10 w-10 rounded-full object-cover" src =${video.authors[0].profile_picture} />
        </div>
        <div >
        <h2 class="font-bold">${video.title}</h2>
        <div class ="flex items-center gap-2">
        <p class="text-gray-400">${video.authors[0].profile_name}</P>
        ${
            video.authors[0].verified == true ?
            `
           <img class="w-5" src ="https://img.icons8.com/?size=100&id=6xO3fnY41hu2&format=png&color=228BE6"/>` : ""
        }
        </div>
        <p><button onclick ="loadDetails('${video.video_id}')" class="btn btn-sm bnt-error">Details</button></P>
        <div/>
    </div>
        `;
        videoContainer.append(card);
    });
    };

const displayCategories= (categories) =>{
    const categoryContainer =document.getElementById('categoris');
    categories.forEach((item) => {
        console.log(item);

        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML =
        `
        <button id="btn${item.category_id}" onclick ="loadCategoriesVideo(${item.category_id})" class="btn category-btn">
        ${item.category}
        </button>
        `

        categoryContainer.append(buttonContainer);
    });
};

document.getElementById("search-input").addEventListener("keyup",(e)=>{
    loadVideos(e.target.value);
})
loadCategories();
loadVideos();