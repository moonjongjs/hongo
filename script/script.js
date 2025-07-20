(function(){
   
    const fashion = {
        init(){
            this.paralrax();
            this.header();
            this.section1();
            this.section2();
            this.section3();
            this.section4();
            this.section5();
            this.section6();
            this.section7();
            this.section8();
            this.footer();
            this.modal();
        },
        paralrax(){

          // 패럴랙스(Paralrax) 구현       
          const winHeigh = window.innerHeight;
          const sections = document.querySelectorAll('.section');

          let sectionTop = []; // 오프셋 값이 바뀌는 배열 변수          
          sections.forEach((element, index)=>{
               sectionTop[index] = element.offsetTop - winHeigh;
          });

          // 4. 윈도우 스크롤이벤트 => 애니메이션 구현 => 패럴랙스
          window.addEventListener('scroll', ()=>{

               if(window.scrollY === 0){ // 스크롤 탑값이 0이면 초기화
                    sections.forEach((element)=>{
                         element.classList.remove('on');
                    })
               }

               // 비동기 처리 방식으로 패럴랙스 구현 
               // 1. 선언적 함수 => 패럴랙스
               // async function paralraxFn(offsetTop, idx){
               //      if(window.scrollY > offsetTop){
               //           sections[idx].classList.add('on');
               //      }
               // }

               
               // 익명함수, 람다함수, 화살표함수
               const paralraxFn=async(offsetTop, idx)=>{
                    if(window.scrollY > offsetTop){
                         sections[idx].classList.add('on');
                    }
               }

               // 2. 배열 => 함수 호출 실행
               sectionTop.map(async(offsetTop, idx)=>{
                    await paralraxFn(offsetTop, idx)
               })

          })


         



        },
        header(){

          // 스크롤 변수
          let newScr = 0;  // 새로운 스크롤 탑값 기억
          let oldScr = 0;  // 이전의 스크롤 탑값 기억
          const header = document.querySelector('#header');

          // GNB & LNB 변수
          const mainBtn = document.querySelectorAll('.main-btn');  // 7개
          const sub = document.querySelectorAll('.sub');           // 7개

          const subSubLine1 = document.querySelector('.sub-sub-line1'); // 서브5  li 라인
          const subSubLine2 = document.querySelector('.sub-sub-line2'); // 서브5  li 라인
          const subSubLine3 = document.querySelector('.sub-sub-line3'); // 서브5  li 라인

          const sub5Btn1 = document.querySelector('.sub5-btn1');  // 서브5 서브버튼1 
          const sub5Btn2 = document.querySelector('.sub5-btn2');  // 서브5 서브버튼2 
          const sub5Btn3 = document.querySelector('.sub5-btn3');  // 서브5 서브버튼3 
          
          const sub5Sub1 = document.querySelector('.sub5-sub1');  // 서브5 서브메뉴1
          const sub5Sub2 = document.querySelector('.sub5-sub2');  // 서브5 서브메뉴2
          const sub5Sub3 = document.querySelector('.sub5-sub3');  // 서브5 서브메뉴3

          const gnb = document.querySelector('#gnb');              // 1개         
          const mobileBtn = document.querySelector('.mobile-btn');              // 1개         
          let currentBtnNum = 0;  // 현재 버튼 번호 기억

          // 모바일 버튼(햄버거 버튼)
          let toggle = false;  // 토글 변수
          


          ///////////////////////////////////////////
          // 0. 스크롤 이벤트 시작
          ///////////////////////////////////////////
          scrollEvent();
          function scrollEvent(){
               newScr = window.scrollY;               
               if(window.scrollY===0){
                    header.classList.add('bg')
                    header.classList.remove('on')
               }
               else {
                    header.classList.remove('bg')
                    if(newScr-oldScr<0){  // UP  위로                     
                         header.classList.remove('on')
                    }
                    if(newScr-oldScr>0){  // DOWN 아래로 
                         header.classList.add('on');
                         
                    }
                    mobileFormat(); // 모바일 초기화
               }
               oldScr = newScr
          }

          // 스크롤 이벤트 발생하면 실행
          window.addEventListener('scroll', ()=>scrollEvent() )

          ///////////////////////////////////////////
          // 0. 스크롤 이벤트 끝
          ///////////////////////////////////////////



          ///////////////////////////////////////////
          // 1. 윈도우 리사이즈 시작
          ///////////////////////////////////////////
          // 데스크탑 초기화 함수 => 모바일 에서 초기화
           function desktopFormat(){
               // 메인버튼
               mainBtn.forEach((item2)=>{
                    item2.classList.remove('on'); // className 에 삭제
               })
               // 서브메뉴
               sub.forEach((item2, i)=>{
                    sub[i].style.transition = 'all 0s ease-in-out';
                    sub[i].classList.remove('on');
               })
               // 서브서브 메뉴 초기화
               sub5Sub1.classList.remove('on');
               sub5Sub2.classList.remove('on');
               sub5Sub3.classList.remove('on');
               
           }

          // 모바일 초기화 함수 => 데스크탑에서 초기화
          function mobileFormat(){               
               mobileBtn.classList.remove('on');
               gnb.classList.remove('on');
               sub.forEach((item, i)=>{
                    sub[i].style.transition = 'all 0s ease-in-out';
                    sub[i].classList.remove('on');
               })
               return;
          }





          // 데스크탑 함수
          // 메인버튼 마우스엔터 이벤트 핸들러
          const mainBtnmouseenter=(e, idx)=>{
               // 메인버튼
               mainBtn.forEach((item2)=>{
                    item2.classList.remove('on'); // className 에 삭제
               })
               e.target.classList.add('on');  // className 에 추가

               // 서브메뉴
               sub.forEach((item2, i)=>{
                    sub[i].style.transition = 'all 0s ease-in-out';
                    sub[i].classList.remove('on');
               })
               
               sub[idx].style.transition = 'all 0.3s ease-in-out';
               sub[idx].classList.add('on');

               currentBtnNum = idx;  // 현재버튼번호
          }

          const deskTopFn=()=>{
               // 데스크탑
               // 7개 메인버튼 이벤트
               // 메인버튼.addEventListener('이벤트', (e)=>이벤트핸들러(e, 매개변수) ) // 이벤트 등록
               // 메인버튼.removeEventListener('이벤트', (e)=>이벤트핸들러(e, 매개변수) ) // 이벤트 제거
               mainBtn.forEach((item, idx)=>{
                    mainBtn[idx].addEventListener('mouseenter', (e)=>mainBtnmouseenter(e, idx))  
               });

               // GNB 영역 떠나면 => 해당하는 버튼과 서브메뉴만 트랜지션 적용
               gnb.addEventListener('mouseleave', ()=>{     
                    mainBtn[currentBtnNum].style.transition = 'all 0.3s ease-in-out'
                    mainBtn[currentBtnNum].classList.remove('on');

                    sub[currentBtnNum].style.transition = 'all 0.3s ease-in-out'
                    sub[currentBtnNum].classList.remove('on');
               })


               // 서브5 버튼1 => sub5Btn1 마우스오버(mouseenter) show
               // 서브-서브 구현
               sub5Btn1.addEventListener('mouseenter', (e)=>{
                    sub5Sub1.classList.add('on');
               })

               // 서브5 li 라인1 => subSubLine1 마우스아웃(mouseleave) hide
               // 서브-서브 구현
               subSubLine1.addEventListener('mouseleave', (e)=>{
                    sub5Sub1.classList.remove('on');
               })

               // 서브5 버튼2 => sub5Btn1 마우스오버(mouseenter) show
               // 서브-서브 구현
               sub5Btn2.addEventListener('mouseenter', (e)=>{
                    sub5Sub2.classList.add('on');
               })

               // 서브5 li 라인2 => subSubLine2 마우스아웃(mouseleave) hide
               // 서브-서브 구현
               subSubLine2.addEventListener('mouseleave', (e)=>{
                    sub5Sub2.classList.remove('on');
               })

               // 서브5 버튼3 => sub5Btn3 마우스오버(mouseenter) show
               // 서브-서브 구현
               sub5Btn3.addEventListener('mouseenter', (e)=>{
                    sub5Sub3.classList.add('on');
               })

               // 서브5 li 라인3 => subSubLine3 마우스아웃(mouseleave) hide
               // 서브-서브 구현
               subSubLine3.addEventListener('mouseleave', (e)=>{
                    sub5Sub3.classList.remove('on');
               })

          }

          // 모바일 함수
          const mobileFn=()=>{

               // 모바일
               // GNB 모바일 햄버거 버튼 클릭 이벤트
               mobileBtn.addEventListener('click', (e)=>{
                    e.preventDefault();
                    // 모바일버튼
                    mobileBtn.classList.contains('on') ? mobileBtn.classList.remove('on') : mobileBtn.classList.add('on');
                    // gnb 보이기
                    gnb.style.transition = 'height 0.2s ease-in-out';
                    gnb.classList.contains('on') ? gnb.classList.remove('on') : gnb.classList.add('on');
                    return;
               })

               // 메인버튼, 서브메뉴 갯수, 높이 가변형 구현
               // 아코디언 메뉴 구현
               // 메인버튼 클릭 이벤트  
               // 서브메뉴 클래스 속성 사용하여 구현
               let subHeight = Array(mainBtn.length).fill(0); // 높이 배열 변수
               let t = Array(mainBtn.length).fill(false);     // 토글 배열 변수
               mainBtn.forEach((item, idx)=>{
                    
                    // 데스크탑 마우스엔트 이벤트핸들러 제거
                    // mainBtn[idx].removeEventListener('mouseenter', (e)=>mainBtnmouseenter(e, idx)) 

                    // 서브메뉴 7의 높이 확인하고 배열에 저장하기
                    subHeight[idx] = sub[idx].scrollHeight;
                    console.log( subHeight  );

                    // 메인버튼 클릭 이벤트 리스너
                    mainBtn[idx].addEventListener('click', (e)=>{
                         e.preventDefault();
                         // 아코디언 구현
                         
                         // on 클래스 속성이 있다면 true 를 반환 
                         // on 클래스 속성이 없다면 false 를 반환 
                         // console.log( sub[idx].classList.contains('on') )

                         if(t[idx]){ //  true 이면                              
                              sub[idx].style.transition = 'all 0.3s ease-in-out';
                              sub[idx].style.height = 0;
                              t[idx] = false;
                         }
                         else { //  false 이면                             
                              t[idx] = true;
                              // 서브메뉴
                              sub.forEach((item2, i)=>{
                                   sub[i].style.transition = 'all 0s ease-in-out';
                                   sub[i].style.height = 0;
                              })
                              sub[idx].style.transition = 'all 0.3s ease-in-out';
                              sub[idx].style.height = `${subHeight[idx]}px`;
                         }
                    })  
               });


          }

          // 리사이즈 함수
          const windowResize=()=>{
               if(window.innerWidth > 991){  
                    mobileFormat(); // 모바일 초기화 함수
                    deskTopFn(); // 데스크탑 함수
               }
               else{
                    desktopFormat();   // 데스크탑 초기화 함수
                    mobileFn();  // 모바일 함수
               }
          }
          windowResize(); // 로딩시

          // 리사이즈 이벤트 등록
          window.addEventListener('resize', ()=>windowResize() )
          ///////////////////////////////////////////
          // 윈도우 리사이즈 끝
          ///////////////////////////////////////////


        },
        section1(){  // 메인슬라이드 구현 4초 간격
             
               // 0. cnt 변수 설정
               // 1. 메인슬라이드 함수
               // 2. 다음카운트 함수
               // 3. 셋인타발
               let cnt=0;
               let setId=0;     // 타이머 변수
               const slideWrap = document.querySelector('#section1 .slide-wrap');
               const prevBtn = document.querySelector('#section1 .prev-btn');
               const nextBtn = document.querySelector('#section1 .next-btn');

               // 터치스와이프 변수
               let touchStart = 0
               let touchEnd = 0

               // 드래앤드롭 변수
               let mouseDown = false
               let dragStart = 0
               let dragEnd = 0

               // 1-1. 마우스다운 : 터치시작 => 데스크탑(PC)
               slideWrap.addEventListener('mousedown', (e)=>{
                    
                    // clearInterval(setId);  // 타이머 일시중지
                    autoTimer(); // 4초 후에 호출실행
                    
                    touchStart = e.clientX;
                    // 드래그앤드롭 무브기능을 제어한다.
                    mouseDown = true;
                    // 슬라이드1,2,3 드래그시작좌표값
                    dragStart = e.clientX - (slideWrap.getBoundingClientRect().left + (window.innerWidth-15))
               })
               // 1-2. 터치스타트 : 터치시작 => 태블릿, 모바일(Mobile)
               slideWrap.addEventListener('touchstart', (e)=>{                    
                    autoTimer(); // 4초 후에 호출실행                    
                    touchStart = e.changedTouches[0].clientX; // 모바일
                    // 드래그앤드롭 무브기능을 제어한다.
                    mouseDown = true;
                    // 슬라이드1,2,3 드래그시작좌표값
                    dragStart = e.changedTouches[0].clientX - (slideWrap.getBoundingClientRect().left + (window.innerWidth-15))
               })

               // 2-1 마우스업 : 터치끝 => 데스크탑(PC)               
               slideWrap.addEventListener('mouseup', (e)=>{
                    touchEnd = e.clientX;
                    if(touchStart-touchEnd > (window.innerWidth-15)/2  ){ 
                         nextCount()
                    }
                    else{
                         mainSlide();
                    }

                    if(touchStart-touchEnd < -(window.innerWidth-15)/2 ){
                          prevCount()
                    }                    
                    else{
                         mainSlide();
                    }

                    mouseDown = false;  // 드래그 끝내야 한다.
                   
               })
               // 2-1 터치앤드 : 터치끝 => 태블릿, 모바일
               slideWrap.addEventListener('touchend', (e)=>{
                    touchEnd = e.changedTouches[0].clientX; // 모바일;
                    if(touchStart-touchEnd > (window.innerWidth-15)/2  ){ 
                         nextCount()
                    }
                    else{
                         mainSlide();
                    }

                    if(touchStart-touchEnd < -(window.innerWidth-15)/2 ){
                          prevCount()
                    }                    
                    else{
                         mainSlide();
                    }

                    mouseDown = false;  // 드래그 끝내야 한다.
                   
               })
               
               // 예외상황
               // 2-2 마우스업 : 터치끝 => 데스크탑(PC)    
               // 마우스 slideWrap 영역 범위를 벗어나면 도큐먼트에서 이벤트 발생 한다.
               // 예외상태 해결 문선전체영역으로 판단
               document.addEventListener('mouseup', (e)=>{
                    if(mouseDown===false) return; // 마우업이 이벤트 발생되면 취소

                    touchEnd = e.clientX;
                    if(touchStart-touchEnd > (window.innerWidth-15)/2  ){ 
                         nextCount()
                    }
                    else{
                         mainSlide();
                    }

                    if(touchStart-touchEnd < -(window.innerWidth-15)/2 ){
                          prevCount()
                    }                    
                    else{
                         mainSlide();
                    }

                    mouseDown = false;  // 드래그 끝내야 한다.
               })

               // 3-1. 마우스무브: 드래그 앤 드롭
               slideWrap.addEventListener('mousemove', (e)=>{
                    if(mouseDown===false) return;  
                    dragEnd = e.clientX;             
                    slideWrap.style.left = `${dragEnd - dragStart}px` 
               })
               // 3-2. 터치무브: 드래그 앤 드롭
               slideWrap.addEventListener('touchmove', (e)=>{
                    if(mouseDown===false) return;  
                    dragEnd = e.changedTouches[0].clientX; // 모바일;             
                    slideWrap.style.left = `${dragEnd - dragStart}px` 
               })


               // 메인슬라이드 함수
               function mainSlide(){
                    slideWrap.style.transition = 'left 0.3s ease-in-out';
                    slideWrap.style.left = `${-100 * cnt}%`;  // 0 1 2


                    slideWrap.addEventListener('transitionend', ()=>{
                         if(cnt>=3)cnt=0;                         
                         if(cnt <0)cnt=2;
                         slideWrap.style.transition = 'left 0s';
                         slideWrap.style.left = `${-100 * cnt}%`;                         
                         prevCountNumber((cnt+1)-1); // 이전 카운트 번호  1
                                                     // 현재 카운트 번호  2
                         nextCountNumber((cnt+1)+1); // 다음 카운트 번호  3

                         // console.log( slideWrap.childNodes )  // forEach() 사용
                         // console.log( slideWrap.children )    // for of 사용

                         // slideWrap.childNodes.forEach((item, idx)=>{
                         //      if(idx % 2 !== 0){  // 1 3 5 7 9  홀수만 출력
                         //           // console.log( idx, item )
                         //      }
                         // })

                         // for(const item of slideWrap.children){
                         //      console.log( item )
                         // }
                        
                         for(const item of slideWrap.children){
                              // console.log( cnt ) // 1 2 3 1 2 3
                              // ['slide', 'slide1']
                              // ['slide', 'slide2']
                              // ['slide', 'slide3']
                              if(item.className.split(' ')[1]==='slide1' && cnt===0){                             
                                   for(const item2 of slideWrap.children){    
                                        item2.classList.remove('on');
                                   }
                                   item.classList.add('on');                              
                              }
                              else if(item.className.split(' ')[1]==='slide2' && cnt===1){
                                   for(const item2 of slideWrap.children){    
                                        item2.classList.remove('on');
                                   }
                                   item.classList.add('on');
                              }
                              else if(item.className.split(' ')[1]==='slide3' && cnt===2){
                                   for(const item2 of slideWrap.children){    
                                        item2.classList.remove('on');
                                   }
                                   item.classList.add('on');
                              }
                         }


                    })
               }

               // 다음슬라이드 카운트함수
               function nextCount(){
                    cnt++;
                    mainSlide();
               }

               // 이전슬라이드 카운트함수
               function prevCount(){
                    cnt--;
                    mainSlide();
               }
               
               // 자동타이머함수 호출 실행한다.
               function autoTimer(){
                    clearInterval(setId);
                    setId = setInterval(nextCount, 4000);  // 4초 후에 실행
               }
               autoTimer();



               // 이전슬라이드카운트 번호 함수
               function prevCountNumber(n){
                    // console.log('이전 슬라이드 카운트 번호', n===0 ? 3 : n );
                    // 카운트 번호 태그요소에 출력하기
                    prevBtn.textContent = `0${n===0 ? 3 : n}`;
               }

               // 다음슬라이드카운트 번호 함수
               function nextCountNumber(n){
                    // console.log('다음 슬라이드 카운트 번호', n===4 ? 1 : n );  // 1 2 3 
                    // 카운트 번호 태그요소에 출력하기
                    nextBtn.textContent = `0${n===4 ? 1 : n}`;
               }

               // 이전슬라이드버튼 클릭 이벤트 리스너 등록하고 구현하기
               prevBtn.addEventListener('click', (e)=>{
                    e.preventDefault();
                    autoTimer();
                    // 이전카운트함수호출
                    prevCount();
               })

               // 다음슬라이드버튼 클릭 이벤트 리스너 등록하고 구현하기
               nextBtn.addEventListener('click', (e)=>{
                    e.preventDefault();
                    autoTimer();
                    // 다음카운트함수호출
                    nextCount();
               })


        },
        section2(){
            
        },
        section3(){
            
        },
        section4(){
        },
        section5(){
        },
        section6(){

               
               const seconds = document.querySelector('.seconds'); // 초 선택자
               const minutes = document.querySelector('.minutes'); // 분 선택자
               const hours = document.querySelector('.hours');     // 시 선택자
               const days = document.querySelector('.days');       // 일 선택자
               // 데이트 100일 기념일
               let   시작시간 = new Date('2025-05-31 18:00:00');
               const 세일기간 = 100;
               시작시간.setDate(시작시간.getDate() + 세일기간);
               // 시작시간.setHours(시작시간.getHours() + 세일기간);

               setInterval(()=>{
                    let 현재시간 = new Date()
                    const 남은시간 = 시작시간 - new Date()

                    // 초 
                    let 초 = Math.floor(남은시간/(1000)) % 60;       // 초 나머지
                    let 분 = Math.floor(남은시간/(1000*60)) % 60;    // 분 나머지
                    let 시 = Math.floor(남은시간/(1000*60*60)) % 24; // 시 나머지
                    let 일 = Math.floor(남은시간/(1000*60*60*24));   // 일 계산

                    seconds.textContent = String(초).padStart(2, '0');  //padEnd(2, '0')
                    minutes.textContent = String(분).padStart(2, '0');
                    hours.textContent   = String(시).padStart(2, '0');
                    days.textContent    = String(일).padStart(3, '0');
                    
               },1000)


        },
        section7(){
        },
        section8(){
               // 메인슬라이드 구현
               let cnt=0;
               let setId=0;
               const slideWrap = document.querySelector('#section8 .slide-wrap');  
               const img = document.querySelectorAll('#section8 .slide-wrap .img');  

               // 모바일전용 touchstart 손가락 터치 시작
               // 모바일전용 touchend   손가락 터치 끝
               // 모바일전용 touchmove  손가락 터치 무브(이동)
               // 터치할 때 이미지에 이벤트를 제거 => 드래그 앤 드롭에서 발생되는 방해 이벤트 제거
               img.forEach((item)=>{
                    item.addEventListener('dragstart', function(e){ // 데스탑 터치스타트 이벤트
                         e.preventDefault();
                    })
               })


               function mainSlide(){              
                    if(cnt>2){
                         cnt = 0;
                         slideWrap.style.transition = 'left 0.3s ease-in-out';
                         slideWrap.style.left = `${-191.6666667 *  0}px`;               
                    }
                    else{
                         slideWrap.style.transition = 'left 0.3s ease-in-out';
                         slideWrap.style.left = `${-191.6666667 * cnt}px`;
                    }
               }
               function nextCout(){
                    cnt++;
                    mainSlide();
               }
               function autoTimer(){
                    clearInterval(setId);
                    setId = setInterval(nextCout, 4000)
               }
               autoTimer();



               // 마우스 드래그 앤 드롭(Drag & Drop) 구현
               // 1. 마우스 다운 이벤트 리스너 등록
               // 2. 마우스 무브 이벤트 리스너 등록
               // 3. 마우스 업   이벤트 리스너 등록
               let mouseDown = false;
               let dragStart = null;
               let dragEnd   = null;

               // 0. 마우스 클릭 이벤트 리스너 등록  click => 새로고침 제거
               slideWrap.addEventListener('click', (event)=>{
                    event.preventDefault();
               })
             
               // 1. 마우스 다운 이벤트 리스너 등록  touchstart
               slideWrap.addEventListener('mousedown', (event)=>{
                    autoTimer();
                    mouseDown = true;
                    dragStart = event.clientX - (slideWrap.getBoundingClientRect().left - 377.5);  // 현재 mousedown 좌표
               })
               // 1. 터치스타트 이벤트 리스너 등록  touchstart
               slideWrap.addEventListener('touchstart', (event)=>{
                    mouseDown = true;
                    dragStart = event.changedTouches[0].clientX  - (slideWrap.getBoundingClientRect().left - 377.5);  // 현재 mousedown 좌표
               })

               // 2. 마우스 무브 이벤트 리스너 등록 => 마우스 다운 이면 동작  touchmove
               slideWrap.addEventListener('mousemove', (event)=>{
                    if(!mouseDown) return;
                    dragEnd = event.clientX;
                    slideWrap.style.transition = 'left 0s ease-in-out';
                    slideWrap.style.left = `${dragEnd - dragStart}px`;
               })
               // 2. 터치 무브 이벤트 리스너 등록 => 마우스 다운 이면 동작  touchmove
               slideWrap.addEventListener('touchmove', (event)=>{
                    if(!mouseDown) return;
                    dragEnd = event.changedTouches[0].clientX;
                    slideWrap.style.transition = 'left 0s ease-in-out';
                    slideWrap.style.left = `${dragEnd - dragStart}px`;
               })

               // 3. 마우스 업   이벤트 리스너 등록 터치끝 touchend
               slideWrap.addEventListener('mouseup',   (event)=>{
                   mouseDown = false;   

                   if(dragEnd - dragStart < 0){  // 다음슬라이드                         
                         cnt = Math.round(Math.abs(dragEnd - dragStart) / 191.6666667); //absolute 앱솔루트 절대값
                         if(cnt>2){
                              cnt=2;
                         }
                   }        
                         
                   if(dragEnd - dragStart > 0){  // 이전슬라이드 
                         cnt = Math.round(Math.abs(dragEnd - dragStart) / 191.6666667); //absolute 앱솔루트 절대값                         
                         if(cnt>0){
                              cnt=0;
                         }
                   } 
                   
                   mainSlide(); // 메인슬라이드 함수 호출  
               })
               // 3. 터치앤드   이벤트 리스너 등록 터치끝 touchend
               slideWrap.addEventListener('touchend',   (event)=>{
                   mouseDown = false;   

                   if(dragEnd - dragStart < 0){  // 다음슬라이드                         
                         cnt = Math.round(Math.abs(dragEnd - dragStart) / 191.6666667); //absolute 앱솔루트 절대값
                         if(cnt>2){
                              cnt=2;
                         }
                   }        
                         
                   if(dragEnd - dragStart > 0){  // 이전슬라이드 
                         cnt = Math.round(Math.abs(dragEnd - dragStart) / 191.6666667); //absolute 앱솔루트 절대값                         
                         if(cnt>0){
                              cnt=0;
                         }
                   } 
                   
                   mainSlide(); // 메인슬라이드 함수 호출  
               })
               // 도큐먼트 예외처리
               // 3. 마우스 업   이벤트 리스너 등록
               document.addEventListener('mouseup',   (event)=>{
                   if(!mouseDown) return;
                   mouseDown = false;   

                   if(dragEnd - dragStart < 0){
                         console.log( '다음슬라이드 ');
                         cnt = Math.round(Math.abs(dragEnd - dragStart) / 191.6666667); //absolute 앱솔루트 절대값
                         if(cnt>2){
                              cnt=2;
                         }
                   }        
                         
                   if(dragEnd - dragStart > 0){
                         cnt = Math.round(Math.abs(dragEnd - dragStart) / 191.6666667); //absolute 앱솔루트 절대값                         
                         if(cnt>0){
                              cnt=0;
                         }
                   } 
                   
                   mainSlide(); // 메인슬라이드 함수 호출  
               })



        },
        footer(){
        },
        modal(){
        },
    }
    fashion.init();

})();