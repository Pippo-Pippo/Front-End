function editMember() {
    return fetch("json/editMember.json")
      .then((response) => response.json())
      .catch((error) => {
        console.log("실패");
        console.error(error);
      });
  }
  
  editMember().then((data) => {
    displayMember(data);
  });
  
  function displayMember(data) {
    console.log();
    const container = document.getElementById("Member");
    container.innerHTML = createHTMLString(data);
    console.log(data);
  }
  
  function createHTMLString(data) {
    console.log("createhtml");
    const { nickname, region } = data;
    const nicknameInput = document.getElementById("nickname");
    const locationSelect = document.getElementById("locationSelect");
    const regionDisplay = document.getElementById("regionDisplay");
  
    nicknameInput.value = nickname;
  
  
    regionDisplay.textContent = region || "지역을 선택하세요"; 
  
 
    locationSelect.innerHTML = '';
  
    
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = memberData.region || "지역을 선택하세요";
    locationSelect.appendChild(defaultOption);
  
  
    const regions = [
      "서울특별시",
      "부산광역시",
      "대구광역시",
      "인천광역시",
      "광주광역시",
      "대전광역시",
      "울산광역시",
      "세종특별자치시",
      "경기도",
      "강원특별자치도",
      "충청북도",
      "충청남도",
      "전라북도",
      "전라남도",
      "경상북도",
      "경상남도",
      "제주특별자치시도",
    
    ];
  
    regions.forEach((regionOption) => {
      const option = document.createElement("option");
      option.value = regionOption;
      option.textContent = regionOption;
      locationSelect.appendChild(option);
    });
  
 
    if (region) {
      locationSelect.value = region;
    }
  
  
    locationSelect.addEventListener("change", function () {
      regionDisplay.textContent = locationSelect.value;
    });
  
    return '';
  }
  
 
  const memberData = {
    "email": "jiyun@naver.com",
    "nickname": "지윤",
    "region": "경상북도"
  };
  