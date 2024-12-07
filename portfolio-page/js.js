$(document).ready(function () {
    // Smooth Scrollbar 설정
    const Scrollbar = window.Scrollbar;
    // 초기화
    const scrollbarInstance = Scrollbar.init(document.querySelector("#my-scrollbar"), {
        damping: 0.1,
        renderByPixels: true,
    });


    // 메뉴 클릭 여부를 추적하는 플래그
    let isMenuClicked = false;
    // 스크롤 위치에 따라 메뉴 활성화를 업데이트하는 함수
    function updateActiveMenu() {
        // 메뉴를 클릭한 경우 함수 실행 방지
        if (isMenuClicked) {
            setTimeout(() => {
                isMenuClicked = false; // 한 번만 방지하고 다시 활성화
            }, 500);
            return;
        }

        const scrollTop = scrollbarInstance.scrollTop;
        const $menu = $('header .menu li');
        
        // 각 섹션의 위치 정보 확인
        const sections = [
            { element: document.querySelector('main'), index: 0 },
            { element: document.querySelector('.aboutMe'), index: 1 },
            { element: document.querySelector('.portfolio'), index: 2 },
            { element: document.querySelector('.contact'), index: 3 }
        ];
        
        // 각 섹션의 위치를 확인하여 적절한 메뉴 활성화
        sections.forEach(section => {
            const sectionTop = section.element.offsetTop;
            const sectionHeight = section.element.offsetHeight;
            
            if (scrollTop >= sectionTop - 200 && scrollTop < sectionTop + sectionHeight - 200) {
                $menu.eq(section.index).addClass('on').siblings().removeClass('on');
            }
        });
    }
    // 스크롤 이벤트 리스너 추가
    scrollbarInstance.addListener(updateActiveMenu);



    // header 의 menu 클릭 설정
    $('header .menu li').click(function () {
        let $i = $(this).index();
        
        // 메뉴 클릭 플래그 설정
        isMenuClicked = true;


        // 1. list 모양 변경
        $(this).addClass('on').siblings().removeClass('on');
        
        // 2. 메뉴 클릭 시 해당 항목으로 스크롤 이동
        let targetElement;
        switch($i) {
            case 0:
                scrollbarInstance.scrollTo(0, 0, 500);
                return;
            case 1:
                targetElement = document.querySelector('.aboutMe');
                break;
            case 2:
                targetElement = document.querySelector('.portfolio');
                break;
            case 3:
                targetElement = document.querySelector('.contact');
                break;
        }
        if (targetElement) {
            // scrollbarInstance의 scrollIntoView 메서드 사용
            scrollbarInstance.scrollIntoView(targetElement, {
                alignToTop: true,
                offsetTop: 100,
                duration: 500
            });
        }


        
    });


    // portfolio 의 list 클릭 설정
    $('.portfolio .list li').click(function () {
        // 1. list 모양 변경
        $(this).addClass('on').siblings().removeClass('on');

        // 2. 컨텐츠 변경
        if ($(this).index() == 0) {
            // 2024 작업물 보여주기
            $('.work2024').show();
            $('.work2025').hide();
        } else if ($(this).index() == 1) {
            // 2025 작업물 보여주기
            $('.work2025').show().css({'display': 'flex'});
            $('.work2024').hide();
        }
        
    });



    // concept design 이미지 등장 설정
    function handlePortfolioClick() {
        $('.portfolio .btnBox button').click(function () {
            // 현재 클릭된 li 요소
            let $currentItem = $(this).parent().parent().parent();
            
            // work2024 클래스를 가진 li에서 고유한 브랜드/프로젝트 클래스 추출
            let projectNameClass = $currentItem.attr('class').split(' ').find(cls => 
                cls !== 'contentsBox' && cls !== 'work2024'
            );
    
            // 해당 브랜드/프로젝트 클래스를 가진 이미지에 'on' 클래스 추가
            $('.conceptDesign .imgBox img').removeClass('on');
            $('.conceptDesign .imgBox img').each(function() {
                if ($(this).hasClass(projectNameClass)) {
                    $(this).addClass('on');
                }
            });
    
            $('.conceptDesign').show().css({'display': 'flex'});
        });
    }
    handlePortfolioClick();

    // concept design 이미지 퇴장 설정
    $('.conceptDesign button').click(function () {
        $('.conceptDesign').hide();
        $('.conceptDesign .imgBox img').removeClass('on');
    });




    // 메일 주소 복사 기능
    $('.contact .mail .copy').click(function () {
        let $copyText = $('.contact .mail .link b').text();
        
        // Clipboard API 사용
        navigator.clipboard.writeText($copyText).then(function() {
            // 복사 알림 메시지
            $('.copy-message')
            .stop(true, true) // 이전 애니메이션 중단 및 큐 제거
            .css({
                'display': 'flex',
                'top': '60%',
                'opacity': 0
            })
            .animate({
                'top': '50%',
                'opacity': 1
            }, 300)
            .delay(2000)
            .animate({
                'top': '60%',
                'opacity': 0
            }, 300, function() {
                // 애니메이션 완료 후 display 초기화
                $(this).css('display', 'none');
            });

        }).catch(function(err) {
            // 복사 실패 시 에러 처리
            console.error('복사 중 오류 발생:', err);
            alert('복사에 실패했습니다');
        });




    });











});