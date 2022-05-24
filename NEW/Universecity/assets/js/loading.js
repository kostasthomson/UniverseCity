window.onload = () => {
    const queryString = window.location.search;
    if(queryString) {
        window.location = window.location.pathname;
        const redirect_meta = document.getElementById("redirect");
        const prev_content = redirect_meta.getAttribute("content");
        redirect_meta.setAttribute("content", prev_content+queryString);
    }
}