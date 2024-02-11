const generateform=document.querySelector('#generate-form')
const imagegallery=document.querySelector('#image-gallery')
const OPENAI_API_KEY="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"
 const updateImageCard=(data)=>{
    data.forEach((data,index) => {
        const  imageCard=document.querySelectorAll('.img-card')[index]
        const  srcImage=imageCard.querySelector('img')
        const  download=imageCard.querySelector('.download-btn')
    
        const aiGeneratedImg=`data:image/jpeg;base64,${data.b64_json}`
        srcImage.src=aiGeneratedImg
       srcImage.onload=()=>{
        imageCard.classList.remove('loading')
        download.setAttribute('href',aiGeneratedImg)
        download.setAttribute('download',`Image${index+1}.jpg`)

        
    
       }
    });
  
}
const generateAiImages=async(userPromt,userImgQuatity)=>{
    try {
      const response=await fetch("https://api.openai.com/v1/images/generations",{
        method:"POST",
        headers:{
            "Content-Type":"application/json", 
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body:JSON.stringify({
            prompt:userPromt,
            n:parseInt(userImgQuatity),
            size:"256x256",
            response_format:"b64_json"
            
            
        })
      })
      const {data}=await response.json();
    //   console.log(data);
    updateImageCard(data)
    } catch (error) {
        console.log(error);
    }   
}
function submission(e){
// console.log(e);
e.preventDefault()
const imageName=e.srcElement[0].value 
const imagquantity=e.srcElement[1].value
// console.log(imageName,imagquantity);
const innerdiv=Array.from(({length:imagquantity}),()=>
    `     <div id="img-card" class="img-card loading h-8/12 w-96 border-2 relative flex justify-center items-center">
    <img class="h-8/12 w-96" src="./images/loader.svg" alt="" srcset="">
     <a href="#" class="download-btn" id="download-btn">
        <img class=" absolute bottom-5 hover:scale-105 duration-100 p-2 rounded-full font-bold bg-white right-5" src="./images/download.svg" alt="" srcset="">
    </a>
 </div>`

    )
    imagegallery.innerHTML=innerdiv.join("")
    // console.log(imagegallery.innerHTML);
    generateAiImages(imageName,imagquantity)

}
generateform.addEventListener("submit",submission)


// const imgcard=document.querySelector('#img-card')srcElement
// console.log(imagegallery);
// console.log(generateform);
// const updateImageCard=(imageArray)=>{
//     imageArray.forEach((imgobj,index) => {
//         const imgcard=document.querySelectorAll('.img-card')[index]
//         const imgElement=imgcard.querySelector("img")
//         const downloadBtn=imgcard.querySelector(".download-btn")
//         // console.log(imgElement);
//         const aiGeneratedImg=`data:image/jpeg;base64,${imgobj.b64_json}`
//         // console.log(aiGeneratedImg);
//         imgElement.src=aiGeneratedImg
//         imgElement.onload=()=>{
//             imgcard.classList.remove("loading")
//             downloadBtn.setAttribute("href",aiGeneratedImg)
//             downloadBtn.setAttribute("download",`${new Date().getTime()}.jpg`)

//         }

//     });
// }
// const generateAiImages=async(userPromt,userImgQuatity)=>{
//     try {
//       const response=await fetch("https://api.openai.com/v1/images/generations",{
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json", 
//             "Authorization": `Bearer ${OPENAI_API_KEY}`
//         },
//         body:JSON.stringify({
//             prompt:userPromt,
//             n:parseInt(userImgQuatity),
//             size:"256x256",
//             response_format:"b64_json"
            
            
//         })
//       })
//       const {data}=await response.json();
//       console.log(data);
//     updateImageCard(data)
//     } catch (error) {
//         console.log(error);
//     }   
// }

// const handleFormSubmission=(e)=>{
// e.preventDefault()
// const userPromt=e.srcElement[0].value
// const userImgQuatity=e.srcElement[1].value
// // console.log(userPromt,userImgQuatity);
// // IMAGE CARD LOADING STATE
// const imgCardMarkup=Array.from({length:userImgQuatity},()=>
//     `     <div id="img-card" class="img-card loading h-8/12 w-96 border-2 relative flex justify-center items-center">
//     <img class="h-8/12 w-96" src="./images/loader.svg" alt="" srcset="">
//     <a href="#" class="download-btn" id="download-btn">
//         <img class=" absolute bottom-5 hover:scale-105 duration-100 p-2 rounded-full font-bold bg-white right-5" src="./images/download.svg" alt="" srcset="">
//     </a>
// </div>`

// ).join("")

// imagegallery.innerHTML=imgCardMarkup
// generateAiImages(userPromt,userImgQuatity)
// // console.log(imgCardMarkup);
// }
// generateform.addEventListener("submit",handleFormSubmission)