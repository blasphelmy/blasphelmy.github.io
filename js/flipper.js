var flipper = () => {
    const elements = document.getElementsByClassName("_flipper");
    let elementsSwitches = new Map();
    let refreshelements = () => {
        for (let element of elements) {
            if (elementsSwitches.get(element.id)) {
                element.classList.add("scale");
                element.classList.remove("clicked");
                setTimeout(() => {
                    let contentElement = document.getElementById(element.id + "_content");
                    let _backPanel = document.getElementById(element.id + "_backPanel");
                    contentElement.classList.remove("hide");
                    _backPanel.classList.add("hide");
                }, 50);
                elementsSwitches.set(element.id, 0);
            }
        }
    }

    // window.onresize = function () {
    //     for (let element of elements) {
    //         let contentElement = document.getElementById(element.id + "_content");
    //         let _backPanel = document.getElementById(element.id + "_backPanel");
    //         let height = contentElement.offsetHeight;
    //         _backPanel.style.setProperty("height", `${height}px`);
    //     }
    // }

    function cardClick(element) {
        switch (elementsSwitches.get(element.id)) {
            case 0:
                (() => {
                    refreshelements();
                    element.classList.remove("scale");
                    element.classList.add("clicked");
                    setTimeout(() => {
                        let contentElement = document.getElementById(element.id + "_content");
                        let _backPanel = document.getElementById(element.id + "_backPanel");
                        _backPanel.classList.remove("hide");
                    }, 50);
                })();
                elementsSwitches.set(element.id, 1);
                break;
            case 1:
                (() => {
                    element.classList.add("scale");
                    element.classList.remove("clicked");
                    setTimeout(() => {
                        let contentElement = document.getElementById(element.id + "_content");
                        let _backPanel = document.getElementById(element.id + "_backPanel");
                        _backPanel.classList.add("hide");
                    }, 50);
                })()
                elementsSwitches.set(element.id, 0);
                break;
        }
    }
    for (let element of elements) {
        elementsSwitches.set(element.id, 0);
        let contentElement = document.getElementById(element.id + "_content");
        let _backPanel = document.getElementById(element.id + "_backPanel");
        let height = contentElement.offsetHeight;
        _backPanel.style.setProperty("height", `${height}px`);
        element.addEventListener("click", () => {
            cardClick(element);
        });
    }

}