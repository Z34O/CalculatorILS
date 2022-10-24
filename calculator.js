let equation = "";

let keys = document.getElementsByClassName("key");

let keyClick = (keyValue) => {
    // Check if key pressed is an operator, make sure the previous key is not an operator
    // You can't have 2 operators next to each other
    if("÷×+-".includes(keyValue) && "÷×+-.".includes(equation.slice(-1))) {
        return
    }

    // 0 can only be placed every after another non 0 integer and .
    if(keyValue == "0" && "÷×+-".includes(equation.slice(-1))) {
        return
    }

    // Two or more decimal points next to each other is invalid, only allow one
    if(keyValue == "." && equation.slice(-1) == ".") {
        return
    }

    equation += keyValue;

    document.getElementById("result").innerHTML = equation;

    foresee();
}

// Loop through all non-special keys and assign onclick
for(let key of keys) {
    key.addEventListener("click", () => keyClick(key.innerHTML.trim()));
}

let _clear = () => {
    equation = "";
    document.getElementById("result").innerHTML = equation;
    document.getElementById("foresee-result").innerHTML = "";
}

let _del = () => {
    equation = equation.slice(0, -1);
    document.getElementById("result").innerHTML = equation;
    document.getElementById("foresee-result").innerHTML = "";

    foresee();
}

let _calc = () => {
    try {
        let solved = cleanSolve(equation);

        document.getElementById("result").innerHTML = solved;
        document.getElementById("foresee-result").innerHTML = "";

        equation = solved;
    } catch(e) {
        // Invalid expressions are considered Syntax Error
        document.getElementById("result").innerHTML = "Syntax Error";
        document.getElementById("foresee-result").innerHTML = "";
    }
}

// Foresee result below the original result
let foresee = () => {
    let foreseenResult = cleanSolve(equation);
    document.getElementById("foresee-result").innerHTML = foreseenResult ? foreseenResult : "";

    console.log(equation)
}

// Construct JS valid expressions
let cleanSolve = (dirtyEquation) => {
    return (eval(dirtyEquation.replace("÷", "/")
                              .replace("×", "*")
                              .replace("sin", "Math.sin")
                              .replace("cos", "Math.cos")
                              .replace("tan", "Math.tan")
                              .replace("π", "Math.PI")).toString());
}


// Scrolling mechanism I found online with few modifications
let resultBox = document.getElementById("result-box");

let pos = { top: 0, x: 0 };

const mouseDownHandler = (event) => {
    resultBox.style.cursor = 'grabbing';

    pos = {
        // Left current scroll
        left: resultBox.scrollLeft,

        // Get the current mouse X position
        x: event.clientX,
    };

    resultBox.addEventListener('mousemove', mouseMoveHandler);
    resultBox.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = (event) => {
    // How far the mouse has been moved left
    const dx = event.clientX - pos.x;

    // Scroll the element to the left
    resultBox.scrollLeft = pos.left - dx;
};

const mouseUpHandler = function () {
    resultBox.removeEventListener('mousemove', mouseMoveHandler);
    resultBox.removeEventListener('mouseup', mouseUpHandler);

    resultBox.style.cursor = 'grab';
};

resultBox.addEventListener('mousedown', mouseDownHandler);


// Not related to calculator below | Particle background
particlesJS.load("bg", 'libs/particles.json');