const appState = {
    current_view: "intro",
    current_score: 0,
    current_fire: 0
}

document.addEventListener("DOMContentLoaded", () => {

    create_quiz_view(1);

    document.querySelector("#app_widget").onclick = (e) => {
        handle_quiz(e);
    }

}); 

const handle_quiz = (e) => {
    if(e.target.dataset.vote == "hire"){
        appState.current_score += 1;
        create_quiz_view(1);
    }else if(e.target.dataset.vote  == "fire"){
        appState.current_fire += 1;
        create_quiz_view(1);
    }

    if((appState.current_score - appState.current_fire) == 4){
        console.log("Restart");
        appState.current_score = 0;
        appState.current_score = 0;
    }

}


const create_quiz_view = async (user_idx) => {
    const data = await fetch("https://my-json-server.typicode.com/Kbeho730/quiz-app/db");
    const model = await data.json();
    const html_element = render_view(model, '#quiz_view');
    document.querySelector("#app_widget").innerHTML = html_element;
} 

const render_view = (model, view) => {
    const template_source = document.querySelector(view).innerHTML;
    const template = Handlebars.compile(template_source);
    const html_widget_element = template({...model, ...appState });
    
    return html_widget_element;
}