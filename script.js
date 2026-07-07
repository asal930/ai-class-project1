console.log("معلم هوشمند با خانم عربصالحی");

function createIdea(){

let lesson =
document.getElementById("lesson").value;

let grade =
document.getElementById("grade").value;

let topic =
document.getElementById("topic").value;

let type =
document.getElementById("type").value;


if(topic==""){
document.getElementById("result").innerText =
"لطفاً موضوع درس را وارد کنید.";
return;
}


let text = "";
  

if(lesson=="عربی"){

text =
`📚 درس: عربی
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

}

else{

text =
`🎨 درس: هنر
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

}


document.getElementById("result").innerText=text;

}
function copyResult(){

let text = document.getElementById("result").innerText;

navigator.clipboard.writeText(text);

alert("نتیجه کپی شد ✅");

}
