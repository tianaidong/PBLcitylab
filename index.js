
const imageHideShowPlugin = (imageBox, callback) => {
    const hideAll = () => {
        document.querySelectorAll(".image-box-popup").forEach(ele => {
            ele.style.opacity = 1
        })
    }

    const innerPopups = []
    for (let i = 0; i < 5; i++) {
        const y = i * 80
        for (let j = 0; j < 5; j++) {
            const x = j * 80;
            innerPopups.push(`<div class="image-box-popup" style="left:${x}px;top:${y}px" data-offsetY="${i}" data-offsetX="${j}"></div>`)
        }
    }
    imageBox.innerHTML += innerPopups.join("")
    const popups = document.querySelectorAll(".image-box-popup");
    popups.forEach(ele => {
        ele.onclick = function () {
            const offsetY = this.getAttribute("data-offsetY")
            const offsetX = this.getAttribute("data-offsetX")
            callback({ offsetX, offsetY })
            hideAll()
            this.style.opacity = 0
        }
    })
}


let clickOffsetArray = undefined
let exportList = []
var jsPsych = initJsPsych();


const loadImageEvent = (image) => {
    clickOffsetArray = [];
    const imageBox = document.querySelector(".image-box")
    imageHideShowPlugin(imageBox, res => {
        clickOffsetArray.push(res)
    })
}


const imageOnFinish = (params) => {
    // 获取记录的位置
    const response = clickOffsetArray;
    // 拦截设置response数据为点击位置
    params.response = response
}


var timeline = [
    {
        type: jsPsychPreload,
        images: ['images/1.png', 'images/2.png', 'images/3.png', 'images/4.png', 'images/5.png'],
        show_detailed_errors: true
    },
    {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
        <h1>Welcome to our experiment!</h1>
        <p>Have you ever wondered what it's like to live with a visual impairment? 
		<br>Now, you have the chance to experience firsthand what it's like for people with glaucoma to see the world through a narrow tunnel.</p>
		`,
        choices: ['Click here to start the experiment!']
    },
        {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
        <h1>What will I be doing in the experiment?</h1>
		<p><b>Part 1</b><br>
        You'll see images hidden behind a black screen. Click on the areas you want to uncover. Like someone with tunnel vision, you can reveal only one spot at a time. 
		You're free to explore each image for as long as you wish. When you feel you've seen enough of an image, you can choose to move on to the next one.</p>
		<p><b>Part 2</b><br>
        After exploring three images, we'll ask you a few questions about your experience.</p>
		<p><b>Part 3</b><br>
		Finally, we'll provide feedback on how your navigation with a visual impairment compares to other visitors.</p>
        <p><b>The experiment will take no more than 5 minutes.</b><br>
		Are you ready to see the world through different eyes?</p>
        `,
        choices: ['Continue']
    },
	{
        type: jsPsychSurveyHtmlForm,
        preamble: "Let's start simple! What is your age and gender?",
        html: `
            <p>Age: <input name="age" required/></p>
            <p>Gender: <input name="gender" required/></p>
        `
    },
    {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
        <div class="image-box">
            <img src="images/1.png" alt="image" width="400" height="400">
        </div>
        `,
        choices: ['Move to next image'],
        on_load: () => loadImageEvent(1),
        on_finish: imageOnFinish
    },
    {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
        <div class="image-box">
            <img src="images/2.png" alt="image" width="400" height="400">
        </div>
        `,
        choices: ['Move to next image'],
        on_load: () => loadImageEvent(2),
        on_finish: imageOnFinish
    },
    {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
        <div class="image-box">
            <img src="images/3.png" alt="image" width="400" height="400">
        </div>
        `,
        choices: ['Move to next image'],
        on_load: () => loadImageEvent(3),
        on_finish: imageOnFinish
    },
    {
        type: jsPsychSurveyHtmlForm,
        preamble: "Sort by preference",
        html: `
            <div class="rank-w">
                <div>
                    <img src="images/1.png" width="200"/>
                    <p>
                        <input type="range" name="image1" min="0" max="5" value="0">
                    </p>
                </div> 
                <div>
                    <img src="images/2.png" width="200"/>
                    <p>
                        <input type="range" name="image2" min="0" max="5" value="0">
                    </p>
                </div> 
                <div>
                    <img src="images/3.png" width="200"/>
                    <p>
                        <input type="range" name="image3" min="0" max="5" value="0">
                    </p>
                </div> 
            </div> 
        `,
    },
    {
        type: jsPsychSurveyHtmlForm,
        preamble: "Survey Question -1",
        html: `
            <p>Uncertainty stops me from having a strong opinion.</p>
            <p>1 (Not at all) <input type="radio" name="like_experiment" value="1" required> 
            2 <input type="radio" name="like_experiment" value="2" required> 
            3 <input type="radio" name="like_experiment" value="3" required> 
            4 (Very much) <input type="radio" name="like_experiment" value="4" required></p>
        `
    },
    {
        type: jsPsychSurveyHtmlForm,
        preamble: "Survey Question -8",
        html: `
            <p>It frustrates me not having all the information I need.</p>
            <p>1 (Not at all) <input type="radio" name="like_experiment" value="1" required> 
            2 <input type="radio" name="like_experiment" value="2" required> 
            3 <input type="radio" name="like_experiment" value="3" required> 
            4 (Very much) <input type="radio" name="like_experiment" value="4" required></p>
        `
    },
	{
        type: jsPsychSurveyHtmlForm,
        preamble: "Survey Question -15",
        html: `
            <p>When I am uncertain, I can’t function very well.<p>
            <p>1 (Not at all) <input type="radio" name="like_experiment" value="1" required> 
            2 <input type="radio" name="like_experiment" value="2" required> 
            3 <input type="radio" name="like_experiment" value="3" required> 
            4 (Very much) <input type="radio" name="like_experiment" value="4" required></p>
        `
    },
		{
        type: jsPsychSurveyHtmlForm,
        preamble: "Survey Question -6",
        html: `
            <p>Uncertainty makes me uneasy, anxious, or stressed.<p>
            <p>1 (Not at all) <input type="radio" name="like_experiment" value="1" required> 
            2 <input type="radio" name="like_experiment" value="2" required> 
            3 <input type="radio" name="like_experiment" value="3" required> 
            4 (Very much) <input type="radio" name="like_experiment" value="4" required></p>
        `
    },
    {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
            <h1>The trial is over</h1>
            <p>Downloading the trial data file, please wait.</p>
        `,
        choices: ['Exit'],
        on_start() {
            const csvContent = jsPsych.data.get().csv();
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            saveAs(blob, Date.now() + ".csv");
            /* saveCSV([
                ['trial_index', 'trial_type', 'time_elapsed', 'rt', 'response'],
                ...exportList
            ],Date.now()+".csv")  */
        },
        on_finish() {
            window.close()
        }
    },
]

window.onload = function () {
    /* const imageBox = document.querySelector(".image-box")
    imageHideShowPlugin(imageBox, (res) => {
        console.log(res);
    }) */
    jsPsych.run(timeline);
}