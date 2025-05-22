import $ from 'jquery';

function ScrollingText(){
    // VARIABLES
    let text = $("#scrollText");
    let textHeight = text.height();
    let windowHeight = $(window).height();
    let marginTopText = ( windowHeight - textHeight ) / 2;

    //EVENTS
    makeTextAppear();

    //FUNCTIONS
    function makeTextAppear(){
        console.log('test');
        gsap.config({ trialWarn: false });
        gsap.registerPlugin(ScrollTrigger, SplitText);
    
    
        const split = new SplitText("#scrollText", { type: "words" });
    
        var startAnimWord = $(window).width() > 600 ? 40 : 30;
        var heightAnimWord = $(window).width() > 600 ? 35 : 20;
        var delayPixels = $(window).width() > 600 ? 650 : 500;
    
        split.words.forEach((target, index) => {
            gsap.to(target, {
                color: '#404040',
                ease: "none",
                scrollTrigger: {
                trigger: target,
                // markers: true,
                scrub: 0,
                // start: "top top",
                start: () => (startAnimWord * index) - delayPixels + " top",
                end: () => "+=" + heightAnimWord + "px",
                // toggleActions: "play none reverse none"
                }
            });
        });
    }
}

export default ScrollingText;