$.getJSON("../json/alarm.json", function (data) {

    const showData = () => {

        const title = data.data.title;
        const content = data.data.content;
        const cratedAt = data.data.cratedAt;
        

    }
    showData();

});