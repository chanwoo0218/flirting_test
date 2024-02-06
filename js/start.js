const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function calResult() {
  // 결과를 계산할 함수

  var result = select.indexOf(Math.max(...select)); // math.max는 입력값으로 받은 숫자 중 가장 큰 값을 반환,
  // ...(스프레드 연산자)를 사용하면 배열 select의 요소들 중에 최대값을 받을 수 있음. ...이 아닌, select만을 사용하면 배열의 내용이 아닌 배열 객체의 문자열 표현(배열 객체 자체)을 비교하여 최대값 계산.
  // indexOf는 인덱스를 반환

  return result;
}

function setResult() {
  let point = calResult();
  const resultName = document.querySelector(".resultname");
  resultName.innerHTML = infoList[point].name;

  var resultImg = document.createElement("img");
  const imgDiv = document.querySelector("#resultImg");
  var imgURL = "img/image-" + point + ".png";
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add("img-fluid");
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector(".resultDesc");
  resultDesc.innerHTML = infoList[point].desc;
}

function goResult() {
  // result창을 띄움
  qna.style.webkitAnimation = "fadeOut 1s"; // 1초 동안 animation으로 fadeout을 함
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    //fadeout이 끝나고 450ms 후에 fadein을 함
    result.style.webkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block";
    }, 450);
  });
  setResult();
}

function addAnswer(answerText, qIdx, idx) {
  // 버튼 생성 함수
  var a = document.querySelector(".answerBox");
  var answer = document.createElement("button");
  answer.classList.add("answerList"); // 나중에 .answerList를 쓰기 위해 클래스 추가
  answer.classList.add("my-3"); // 버튼에 margin과 padding을 줌
  answer.classList.add("py-3");
  answer.classList.add("mx-auto"); // 버튼에 좌우 공백이 같아짐. -> 중앙정렬됨.
  answer.classList.add("fadeIn"); // 버튼이 생성될 때 fadeIn 클래스 추가(animation.css에 있음.)
  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener("click", function () {
    // click 했을 때 질문과 버튼들을 다 없애고 다음 페이지가 나오게 함.
    var children = document.querySelectorAll(".answerList");
    for (let i = 0; i < children.length; i++) {
      children[i].disabled = true; // 모든 버튼 비활성화
      children[i].style.webkitAnimation = "fadeOut 0.5s"; // 버튼을 없애기 전 fade out
      children[i].style.animation = "fadeOut 0.5s";
    }
    setTimeout(() => {
      // 450밀리초 후에 모든 요소가 fade out되고 함께 숨겨짐
      var target = qnaList[qIdx].a[idx].type;
      for (i = 0; i < target.length; i++) {
        select[target[i]]++;
      } // 누른 버튼에 속하는 type의 인덱스를 1 증가 시킴.
      for (let i = 0; i < children.length; i++) {
        children[i].style.display = "none";
      }
      goNext(++qIdx); // qIdx를 1 증가시켜 goNext()를 다시 실행
    }, 450);
  });
}

function goNext(qIdx) {
  if (qIdx === endPoint) {
    //qIdx가 0부터 시작했으므로 12일 때 goResult()함수를 호출
    goResult();
    return;
  }
  var q = document.querySelector(".qBox");
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a) {
    // qnaList[qIdx].a 안에 있는 objects가 i가 됨.(maybe33)
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector(".statusBar");
  status.style.width = (100 / endPoint) * (qIdx + 1) + "%"; // 현재 진행 상태 퍼센트 만큼 statusBar width로 만듦. 100%는 .statusBar의 부모인 .status와 같아지는 것
}

function begin() {
  main.style.webkitAnimation = "fadeOut 1s"; // 1초 동안 animation으로 fadeout을 함
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    //fadeout이 끝나고 450ms 후에 fadein을 함
    qna.style.webkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    }, 450);
    let qIdx = 0; // qnaList의 질문 순서 0부터
    goNext(qIdx);
  }, 450);
}
