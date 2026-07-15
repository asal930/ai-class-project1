console.log("معلم هوشمند با خانم عربصالحی");

function createIdea() {

    let lesson = document.getElementById("lesson").value;
    let grade = document.getElementById("grade").value;
    let topic = document.getElementById("topic").value;
    let type = document.getElementById("type").value;

    if (topic == "") {
        document.getElementById("result").innerText =
        "لطفاً موضوع درس را وارد کنید.";
        return;
    }

    let text = "";

    if (lesson == "عربی") {

        text = `📚 درس: عربی
🏫 پایه: ${grade}

📖 موضوع: ${topic}

🎯 نوع فعالیت: ${type}

اهداف:
✅ درک بهتر مفهوم درس
✅ مشارکت دانش‌آموزان
✅ یادگیری از طریق تمرین

مراحل اجرا:
1- معرفی موضوع توسط معلم
2- پرسش و پاسخ کوتاه
3- انجام فعالیت گروهی
4- جمع‌بندی و ارزشیابی

تکلیف:
دانش‌آموزان سه مثال درباره «${topic}» بنویسند.`;

    } else {

        text = `🎨 درس: هنر
🏫 پایه: ${grade}

🖌 موضوع: ${topic}

🎯 نوع فعالیت: ${type}

اهداف:
✅ تقویت خلاقیت
✅ افزایش دقت
✅ کار گروهی

مراحل اجرا:
1- نمایش نمونه اثر
2- آموزش تکنیک
3- اجرای فعالیت هنری
4- نمایش آثار دانش‌آموزان

تکلیف:
یک اثر هنری مرتبط با «${topic}» طراحی و ارائه شود.`;

    }

    document.getElementById("result").innerText = text;
}

function copyResult() {

    let text = document.getElementById("result").innerText;

    navigator.clipboard.writeText(text);

    alert("نتیجه کپی شد ✅");
}

function saveIdea() {

    let text = document.getElementById("result").innerText;

    if (text == "نتیجه اینجا نمایش داده می‌شود." || text == "") {
        alert("ابتدا یک پیشنهاد آموزشی ایجاد کنید.");
        return;
    }

    let id = Date.now();

    let date = new Date().toLocaleString("fa-IR");
let cardClass = text.includes("📚 درس: عربی") ? "arabic-card" : "art-card";
    document.getElementById("savedIdeas").innerHTML +=
        "<div class='idea-card " + cardClass + "' id='idea-" + id + "'>" +
        "<h3>📚 ایده ذخیره شده</h3>" +
        "<small>🗓️ " + date + "</small>" +
        "<p>" + text + "</p>" +
        "<button onclick=\"editIdea('idea-" + id + "')\">✏️ ویرایش</button> " +
"<button onclick=\"favoriteIdea('idea-" + id + "')\">⭐ مهم</button> " +
"<button onclick=\"deleteIdea('idea-" + id + "')\">🗑 حذف ایده</button>" +
        "</div>";
updateStats();
    saveToLocal();

    alert("✅ ایده با موفقیت ذخیره شد.");
}

function editIdea(id){

    let idea = document.getElementById(id);

    let p = idea.querySelector("p");

    let newText = prompt("متن جدید ایده را وارد کنید:", p.innerText);

    if(newText == null || newText.trim() == ""){
        return;
    }

    p.innerText = newText;

    saveToLocal();

    alert("✅ ایده ویرایش شد.");
}

function deleteIdea(id){

    let idea = document.getElementById(id);

    if(idea){
        idea.remove();
    }

    saveToLocal();

    alert("ایده حذف شد ✅");
}
updateStats();
function saveToLocal(){

    let ideas = document.getElementById("savedIdeas").innerHTML;

    localStorage.setItem("ideas", ideas);
}

window.onload = function(){

    let ideas = localStorage.getItem("ideas");

    if(ideas){
        document.getElementById("savedIdeas").innerHTML = ideas;
    }

}
updateStats();

function clearIdeas(){

    let ok = confirm("آیا مطمئن هستید که همه ایده‌ها حذف شوند؟");

    if(!ok){
        return;
    }

    document.getElementById("savedIdeas").innerHTML = "";

    localStorage.removeItem("ideas");

    alert("همه ایده‌ها حذف شدند ✅");
}

function searchIdeas(){

    let input = document.getElementById("search").value.toLowerCase();

    let cards = document.getElementsByClassName("idea-card");

    for(let i = 0; i < cards.length; i++){

        let text = cards[i].innerText.toLowerCase();

        if(text.indexOf(input) > -1){

            cards[i].style.display = "block";

        }else{

            cards[i].style.display = "none";

        }

    }

}
function favoriteIdea(id){

    let idea = document.getElementById(id);

    if(idea.classList.contains("favorite")){

        idea.classList.remove("favorite");

        alert("⭐ از حالت مهم خارج شد");

    }else{

        idea.classList.add("favorite");

        alert("⭐ ایده مهم شد");

    }
    updateStats();

    saveToLocal();

}
function updateStats(){

    let ideas = document.getElementsByClassName("idea-card").length;

    let favorites = document.getElementsByClassName("favorite").length;

    document.getElementById("stats").innerHTML =
    "📊 تعداد ایده‌ها: " + ideas +
    " | ⭐ ایده‌های مهم: " + favorites;

}

function downloadPDF(){

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    let text = document.getElementById("result").innerText;

    doc.setFont("helvetica");
    doc.setFontSize(12);

    let lines = doc.splitTextToSize(text,170);

    doc.text(lines,20,20);

    doc.save("idea.pdf");

}
async function downloadWord() {

    const { Document, Paragraph, Packer } = docx;

    let text = document.getElementById("result").innerText;

    if (text == "" || text == "نتیجه اینجا نمایش داده می‌شود.") {
        alert("ابتدا یک پیشنهاد آموزشی ایجاد کنید.");
        return;
    }

    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        text: text
                    })
                ]
            }
        ]
    });

    const blob = await Packer.toBlob(doc);

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "idea.docx";

    link.click();
}
function printIdea() {

    let text = document.getElementById("result").innerHTML;

    if (
        text == "" ||
        text == "نتیجه اینجا نمایش داده می‌شود."
    ) {
        alert("ابتدا یک پیشنهاد آموزشی ایجاد کنید.");
        return;
    }

    let win = window.open("", "_blank");

    win.document.write(`
        <html dir="rtl">
        <head>
            <title>چاپ ایده آموزشی</title>
            <style>
                body{
                    font-family:tahoma;
                    direction:rtl;
                    padding:30px;
                    line-height:2;
                }
                h2{
                    text-align:center;
                }
            </style>
        </head>
        <body>

        <h2>🎓 معلم هوشمند</h2>

        <hr>

        <div>${text.replace(/\n/g,"<br>")}</div>

        </body>
        </html>
    `);

    win.document.close();

    win.print();

}

