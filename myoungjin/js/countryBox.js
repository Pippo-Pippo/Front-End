$.getJSON("../json/regionList.json", function (data) {

    const length = data.regionList.length;
    var i;
    for (i = 0; i < length; i++) {

        const showData = () => {

            const region = data.regionList[i].region;
            const value = data.regionList[i].value;
            const buttonElement = document.createElement('button');
            buttonElement.setAttribute('type', 'button');
            buttonElement.setAttribute('id', region);
            buttonElement.textContent = value;

            const divElement = document.createElement('div');
            divElement.appendChild(buttonElement);

            $('#countryBox').append(divElement);

        }
        showData();
    }
});