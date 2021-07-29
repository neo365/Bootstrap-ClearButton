(function ($) {
            /**
             * Input element에 Clear 버튼을 생성한다.
             * @param element input element object
             */
            var makeClearButton = function (element) {
                if (!element) {
                    return;
                }
                if (!element.closest(".form-group").hasClass("has-feedback")) {
                    element.closest(".form-group").addClass("has-feedback")
                }

                // Clear Button을 input element 뒤로 생성한다.
                element.css({ "padding-right": "30px" });
                element.after($('<button type="button" class="btn btn-sm bg-transparent form-control-feedback has-clear-button-event" style="margin-left: -30px; z-index: 100;" aria-hidden="true"><i class="' + defaultSettings.icon + '"></i></button>'));
            }
            /**
             * Input element에 Clear 버튼을 제거한다.
             * @param element input element object
             */
            var removeClearButton = function (element) {
                if (!element) {
                    return;
                }
                // Clear Button을 찾아서 제거한다.
                element.parent().find(".has-clear-button-event").remove();
            }

            /**
             * Clear Button을 보이기/숨기기 처리
             * @param option option string(show, hide)
             */
            $.fn.makeClearButton = function (option) {
                // 값이 없거나, show 일때 보이기
                if (!option || option === 'show') {
                    makeClearButton($(this));
                }
                // 값이 있을때 hide 이면 숨기기
                else if (option === 'hide') {
                    removeClearButton($(this));
                }

                return $(this);
            }

            // 기본 설정 값
            var defaultSettings = {
                // jquery-validation을 사용하였을 경우 clear이후 valid 정보 제거 여부
                clearValidation: true,
                // Clear Button의 icon with bootsreap
                icon: 'fa fa-times',
            }

            /**
             * 설정 변경
             * @param settings Pure Clear Button Setting
             */
            $.makeClearButton = function (settings) {
                $.extend(defaultSettings, settings)
            }

            /**
             * document onload
             */
            $(document).ready(function () {
                // Input Text의 [x] 클릭 시 내용 삭제
                $(document).on('click', ".has-clear-button-event", function () {
                    var $input = $(this).closest(".form-group").find("input");

                    // input value 제거, 포커스 이동
                    $input.val("").focus();

                    if (defaultSettings.clearValidation) {
                        // validation tooltip, class 제거
                        //$input.removeData("title").tooltip("destroy");
                        $input.closest('.form-group').removeClass('has-error has-success');
                    }
                });
            });
        })($);