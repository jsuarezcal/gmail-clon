// const messages = [
// {
//     sender: "nombre",
//     senderImg: "ruta imagen",
//     adjunto: true,
//     sendDate: "2029-10-04t14...", //formato mockaroo
//     subject: "asunto",
//     body: "texto largo",

//     isFaved: true, 
//     isOpened: true, 
//     isSnoozed: true,
//     isDraft: true, 
//     isSent: true, 
//     isImportant: true, 
//     isSelected: true, 
    
//     category: "social", 
//     folder: "work",


// }
    
// ];
//levar los datos a mocakroo y crear el archivo data.js en el que pegar los resultados y crear el json


/**
 * 
 * toma el array mails
 * extrae los mails que sean primary
 * que is delated sea false
 * que issent sea false
 * que isDraft sea dlase
 * 
 * una vez tenemos el array generamos el html dinámico
 */

const renderPrimary = () => {
    
    const filteredMessages = [];
    let htmlString = "";
    const tabContent = document.querySelector(".tab_content");

    //operación con array
    for (let i = 0; i < mails.length; i++){
        if(
        mails[i].category == "primary" &&
        !mails[i].isDeleted &&
        !mails[i].isSent
         // !mails[i].isDraft lo quito para que haya más mails en la bandeja
         ){
            filteredMessages.push(mails[i]);
        }
    }
    //operación de reducción
    for (let i = 0; i < filteredMessages.length; i++){
        htmlString += `
         <!-----ITEM------>
                <article class="mails" data-id="${filteredMessages[i].id}">
                    <div class="user_pic"> <!-----Imagen usuario------>
                        <div class="pic">
                            <img src="${filteredMessages[i].senderImg}" />
                        </div>
                    </div>
                    <div class="mail_info"><!-----info mail------>
                        <div class="mail_details">
                            <div class="mail_title"><span>${filteredMessages[i].sender}</span></div>
                            <div class="mail_title_info">
                            ${
                                filteredMessages[i].adjunto ? `
                                <div class="mail_icon"><span class="fa fa-paperclip"></span></div>
                                ` : ""
                            }
                                
                                <div class="mail_time">${formatDate(filteredMessages[i].sendDate)}</div>
                            </div>
                        </div>
                        <div class="mail_preview"> <!-----previsualización mail------>
    
                            <div class="mail_message">
                                <div class="mail_subject">
                                ${filteredMessages[i].subject}
                                </div>
                                <p>${formatBody(filteredMessages[i].body)}</p>
                            </div>
                           
                                <div class="star">
                                    <span class="fa fa-star ${filteredMessages[i].isFaved ? "star_click": ""}"></span>
                                </div>
                           
                        </div>
                    </div><!-----FIN info mail------>
                </article>
            <!-----FIN ITEM------>
        `;
    }

    tabContent.innerHTML = htmlString;
    eventFavMail();
}

/**
 * 
 * Formateo fecha
 * 
 * 
 */

const formatDate = (date) =>{

    const dateReal = new Date(date);
    const y = dateReal.getFullYear();
    const m = dateReal.getMonth() + 1;
    const d = dateReal.getDate();

    return `${d}/${m}/${y}`; //retorna string con d,m,y
};

/**
 * 
 * Preview cuerpo mensaje
 * 
 * 
 */

const formatBody = (body) => {
    return body.slice(0,120) + "..."
};



/**
 * 
 * Evento nuevo mail
 * 
 * 
 */
const composeMail = () => {

    const composeButton = document.querySelector(".new_mail_cta");
    const composeBox = document.querySelector(".mail_text_area");
    const closeButton = document.querySelector(".text_area_close_icon")

    composeButton.addEventListener("click", () => {
        //cuando hago click en componer email...
        composeBox.classList.toggle("visible");
        //le cambio la clase a composeBox para que cambie la visibilidad
    });

    //evento cerrar 

    closeButton.addEventListener("click", () => {
        
        composeBox.classList.remove("visible");
        //al hacer click en la X quito la clase visible
    });

};

/**
 * 
 * Evento Favorito
 * 
 * 
 */
const eventFavMail = () => {

//    const favIcon = document.querySelectorAll(".sin_relleno"); //para seleccionar todos los mails sin fav
//    const favMail = document.querySelectorAll(".relleno");

    const star = document.querySelectorAll('.star');
    
   //dar fav
   //hay que hacer un bucle para que el evento actúe en todos los mails
   star.forEach( starItem => {
    starItem.addEventListener("click", () => {
        // id mensaje -        
        const message = starItem.closest('.mails');
        const clickedId = message.dataset.id;
        const mail = mails.find(mail => mail.id == clickedId);
        mail.isFaved = !mail.isFaved;
        
        renderPrimary();
       });
   });

};

const eventNotFavMail = () => {
    const favMail = document.querySelectorAll(".relleno");
//quitar fav + bucle
favMail.forEach( favMail => {
    favMail.addEventListener("click", () => {
       
        favMail.remove("star_click ");
       
        
    });
   });
};

/**
 * 
 * Recuento inbox
 * 
 * 
 */

const renderInbox = () =>{
    const inboxAmountBox = document.querySelector(".menu_mailbox_main_item .amount"); 
    let inboxAmount = 0;
    const filteredMessages = [];

    for (let i = 0; i < mails.length; i++){
        if(!mails[i].isOpened) //los mails que no están abiertos
        {
            filteredMessages.push(mails[i]);
        }
    }

    inboxAmount = filteredMessages.length;
    inboxAmountBox.innerHTML = inboxAmount;
};

/**
 * 
 * Recuento Favoritos
 * 
 * 
 */

const renderStarred = () =>{
    const starredAmountBox = document.querySelector(".menu_mailbox_main_item_starred .amount"); 
    let starredAmount = 0;
    const filteredMessages = [];

    for (let i = 0; i < mails.length; i++){
        if(mails[i].isFaved) //los mails que están en favoritos
        {
            filteredMessages.push(mails[i]);
        }
    }

    starredAmount = filteredMessages.length;
    starredAmountBox.innerHTML = starredAmount;
};
/**
 * 
 * Recuento snoozed
 * 
 * 
 */
const renderSnoozed = () =>{
    const snoozedAmountBox = document.querySelector(".menu_mailbox_main_item_snoozed .amount"); 
    let snoozedAmount = 0;
    const filteredMessages = [];

    for (let i = 0; i < mails.length; i++){
        if(mails[i].isSnoozed) //los mails snoozed
        {
            filteredMessages.push(mails[i]);
        }
    }

    snoozedAmount = filteredMessages.length;
    snoozedAmountBox.innerHTML = snoozedAmount;
};
/**
 * 
 * Recuento sent
 * 
 * 
 */
const renderSent = () =>{
    const sentAmountBox = document.querySelector(".menu_mailbox_main_item_sent .amount"); 
    let sentAmount = 0;
    const filteredMessages = [];

    for (let i = 0; i < mails.length; i++){
        if(mails[i].isSent) //los mails que están enviados
        {
            filteredMessages.push(mails[i]);
        }
    }

    sentAmount = filteredMessages.length;
    sentAmountBox.innerHTML = sentAmount;
    console.log(renderSent);
};
/**
 * 
 * Recuento Draft
 * 
 * 
 */
const renderDraft = () =>{
    const draftAmountBox = document.querySelector(".menu_mailbox_main_item_draft .amount"); 
    let draftAmount = 0;
    const filteredMessages = [];

    for (let i = 0; i < mails.length; i++){
        if(mails[i].isDraft) //los mails en draft
        {
            filteredMessages.push(mails[i]);
        }
    }

    draftAmount = filteredMessages.length;
    draftAmountBox.innerHTML = draftAmount;
};
/**
 * 
 * Recuento Deleted
 * 
 * 
 */
const renderDeleted = () =>{
    const deletedAmountBox = document.querySelector(".menu_mailbox_main_item_deleted .amount"); 
    let deletedAmount = 0;
    const filteredMessages = [];

    for (let i = 0; i < mails.length; i++){
        if(mails[i].isDeleted) //los mails en la papelera
        {
            filteredMessages.push(mails[i]);
        }
    }

    deletedAmount = filteredMessages.length;
    deletedAmountBox.innerHTML = deletedAmount;
};

/**
 * 
 * 
 * 
 * 
 * Recuento Carpetas
 * 
 * 
 * 
 * 
 * 
 * 
 */

//------DISCOUNTS
const renderDiscounts = () =>{
    const discountsAmountBox = document.querySelector(".discounts_folder .amount"); 
    let discountsAmount = 0;
    const filteredMessages = [];

    for (let i = 0; i < mails.length; i++){
        if(mails[i].folder == "discounts") //categoría de carpeta
        {
            filteredMessages.push(mails[i]);
        }
    }

    discountsAmount = filteredMessages.length;
    discountsAmountBox.innerHTML = discountsAmount;
};
//------PERSONAL
const renderPersonal = () =>{
    const personalAmountBox = document.querySelector(".personal_folder .amount"); 
    let personalAmount = 0;
    const filteredMessages = [];

    for (let i = 0; i < mails.length; i++){
        if(mails[i].folder == "personal") //categoría de carpeta
        {
            filteredMessages.push(mails[i]);
        }
    }

    personalAmount = filteredMessages.length;
    personalAmountBox.innerHTML = personalAmount;
};
//------WORK
const renderWork = () =>{
    const workAmountBox = document.querySelector(".work_folder .amount"); 
    let workAmount = 0;
    const filteredMessages = [];

    for (let i = 0; i < mails.length; i++){
        if(mails[i].folder == "work") //categoría de carpeta
        {
            filteredMessages.push(mails[i]);
        }
    }

    workAmount = filteredMessages.length;
    workAmountBox.innerHTML = workAmount;
};

/**
 * 
 * Intento fallido de parametrizar folders
 * 
 * 
 */

// const renderFolders = (property, mainSelector) =>{
//     const folderAmountBox = document.querySelector(mainSelector + " .amount"); 
//     let folderAmount = 0;
//     const filteredMessages = [];

//     for (let i = 0; i < mails.length; i++){
//         if(mails[i].folder == [property]) //categoría de carpeta
//         {
//             filteredMessages.push(mails[i]);
//         }
//     }

//     folderAmount = filteredMessages.length;
//     folderAmountBox.innerHTML = folderAmount;
// };


//Init
renderPrimary();
composeMail();
renderInbox();
renderStarred();
renderDiscounts();
renderPersonal();
renderWork();
renderSent();
renderSnoozed();
renderDraft();
renderDeleted();

// renderFolders("personal" ".personal_folder");
