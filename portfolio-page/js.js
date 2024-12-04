$(document).ready(function () {








    // portfolio 의 list 클릭 설정
    $('.portfolio .list li').click(function () {
        // 1. list 모양 변경
        $(this).addClass('on').siblings().removeClass('on');
        
    });





    // 메일 주소 복사 기능
    $('.contact .mail .copy').click(function () {
        let copyText = $('.contact .mail .link b').text();
        
        // Clipboard API 사용
        navigator.clipboard.writeText(copyText).then(function() {
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