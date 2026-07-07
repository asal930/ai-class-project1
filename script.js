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
`برای درس عربی پایه ${grade} درباره «${topic}» یک ${type} طراحی کن. 
از مثال‌های ساده، فعالیت کلاسی و مشارکت دانش‌آموزان استفاده شود.`;

}

else {

text =
`برای درس هنر پایه ${grade} درباره «${topic}» یک ${type} طراحی کن.
ایده باید خلاقانه و قابل اجرا در کلاس باشد.`;

}


document.getElementById("result").innerText=text;

}
function copyResult(){

let text = document.getElementById("result").innerText;

navigator.clipboard.writeText(text);

alert("نتیجه کپی شد ✅");

}
