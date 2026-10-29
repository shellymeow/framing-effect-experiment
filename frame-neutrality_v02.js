// Initialize jsPsych
var jsPsych = initJsPsych({});

// capture info from Prolific
var prolific_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
var study_id = jsPsych.data.getURLVariable('STUDY_ID');
var session_id = jsPsych.data.getURLVariable('SESSION_ID');

jsPsych.data.addProperties({
    prolific_id: prolific_id,
    study_id: study_id,
    session_id: session_id
});

var timeline = [];

/** Initialize connection with Pavlovia -----------------------------------------------------*/
const pavlovia_init = {
    type: jsPsychPavlovia, // Corrected type initialization for Pavlovia
    command: 'init'
};
timeline.push(pavlovia_init);

// Coin flip to select gain or loss frames
// var selected_frame = Math.random() > 0.5 ? 'loss' : 'gain';
var selected_frame = 'gain'; // For balancing purposes, always select gain frame

/**  Define Questions and choices  */
// Define the neutral option
const neutral_option = `I want to flip a coin`;

// Define the task questions
const task_stimuli = [
    {
        question: 'Disease', 
        //type:'formal',
        frame: 'gain',
        content: `
            Recently, a dangerous new disease has been going around. 
            Without medicine, 600,000 people will die from it. 
            In order to save these people, two types of medicine are being made.<br><br>
            Now you have to choose which one to use. Which medicine do you choose?<br><br>
            `,
        certain_option:'200,000 people will be saved.',
        uncertain_option:'There is a 33.3% chance that 600,000 people will be saved and a 66.6% chance that no one will be saved.',
    },
    {
        question: 'Disease', 
        //type:'formal',
        frame: 'loss',
        content: `
            Recently, a dangerous new disease has been going around. 
            Without medicine, 600,000 people will die from it. 
            In order to save these people, two types of medicine are being made.<br><br>
            Now you have to choose which one to use. Which medicine do you choose?<br><br>
            `,
        certain_option:'400,000 people will die.',
        uncertain_option:'There is a 33.3% chance that no one will die and a 66.6% chance that 600,000 will die.',
    },
    {
        question:'Unemployment',
        //type:'practice',
        frame: 'gain',
        content: `
            Imagine that the government is preparing to respond to an economic crisis.
            The government expects that 300,000 people will lose their jobs. 
            The government is considering two programs to reduce unemployment. <br><br>
            Now you have to choose which one to follow. Which program do you choose?<br><br>
        `,
        certain_option: '1,000 jobs will be saved.',
        uncertain_option: 'There is a 33.3% chance that 300,000 jobs will be saved and a 66.6% chance that no jobs will be saved.', // to be checked...
    },
    {
        question:'Unemployment',
        //type:'practice',
        frame: 'loss',
        content: `
            Imagine that the government is preparing to respond to an economic crisis.
            The government expects that 300,000 people will lose their jobs. 
            The government is considering two programs to reduce unemployment. <br><br>
            Now you have to choose which one to follow. Which program do you choose?<br><br>
        `,
        certain_option: '1,000 jobs will be lost.',
        uncertain_option: 'There is a 33.3% chance that 300,000 jobs will be lost and a 66.6% chance that no jobs will be lost.', // to be checked...
    },
    {
        question:'Painting',
        //type:'formal',
        frame: 'gain',
        content: `
                A large museum is damaged by fire. 1,000 famous paintings are at the risk of being destroyed. 
                Two alternative programs have been proposed to restore the paintings.<br><br>
                Now you have to choose which one to follow. Which program do you choose?<br><br>
                `,
        certain_option: '400 paintings will be saved.',
        uncertain_option: 'There is a 40% chance that 1,000 paintings will be saved and a 60% chance that no painting will be saved.',
    },
    {
        question:'Painting',
        //type:'formal',
        frame: 'loss',
        content: `
                A large museum is damaged by fire. 1,000 famous paintings are at the risk of being destroyed. 
                Two alternative programs have been proposed to restore the paintings.<br><br>
                Now you have to choose which one to follow. Which program do you choose?<br><br>
                `,
        certain_option: '600 paintings will be destroyed.',
        uncertain_option: 'There is a 40% chance that no painting will be destroyed and a 60% chance that 1,000 paintings will be destroyed.',
    },
    {
        question:'Virus',
        //type:'formal',
        frame: 'gain',
        content: `
                There is a new computer virus which can infect certain computer software. 
                At the moment, this software is installed on 2,000,000 computers. 
                Two types of antivirus software are being developed. <br><br>
                Now you have to choose, which one to use. Which antivirus software do you choose?<br><br>
                `,
        certain_option: '800,000 computers will remain virus-free.',
        uncertain_option: 'There is a 40% chance that 2,000,000 computers will remain virus-free and a 60% chance that no computer will remain virus-free.',
    },
    {
        question:'Virus',
        //type:'formal',
        frame: 'loss',
        content: `
                There is a new computer virus which can infect certain computer software.
                At the moment, this software is installed on 2,000,000 computers.
                Two types of antivirus software are being developed. <br><br>
                Now you have to choose, which one to use. Which antivirus software do you choose?<br><br>
                `,
        certain_option: '1,200,000 computers will be infected.',
        uncertain_option: 'There is a 40% chance that no computer will be infected and a 60% chance that 2,000,000 computers will be infected.',
    },
];
/* ----------------------------------------------------------
/**  Welcome  */
var welcome = {
    data: {
        screen_id: 'welcome'
    },
    type: jsPsychHtmlButtonResponse,
    stimulus: '<h1>Welcome to our hypothetical decision-making experiment.</h1><p><br>Please use Chrome, Firefox, Safari, or Edge, and make sure that your Internet connection is stable.</p>',
    choices: ['Click here to continue']
};
timeline.push(welcome);

/** Consent */
var consent = {
    data: {
        screen_id: 'consent-form'
    },
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <h1>Consent Form</h1>
    <p style='text-align: left;'>
    You are invited to participate in a research study on decision making. Before you decide whether to participate, it is important for you to understand the purpose of the study, what will be asked 
    of you, and any potential risks or benefits associated with your participation. 
    <br><br>

    <strong>Purpose of the Study:</strong><br>
    The purpose of this study is to investigate partterns in decision-making, which may contribute to a better understanding of the decision-making process.
    <br><br> 

    <strong>Procedures:</strong><br>
    If you agree to participate in this study, you will be asked to complete an online task and answer some questions. The estimated time to complete the whole procedure is less than 10 minutes. 
    Your responses will be anonymous and confidential, and no personally identifiable information will be collected.
    <br><br> 

    <strong>Benefits and Risks:</strong><br>
    There may not be any direct benefits to you for participating in this study. However, your participation will contribute to the advancement of knowledge in the field of social learning. 
    There are minimal anticipated risks associated with participating in this study. However, if you feel uncomfortable answering any question or if you experience any emotional distress during the study, 
    you are free to withdraw at any time without negative consequences.
    <br><br> 

    <strong>Confidentiality:</strong><br>
    All data collected during this study will be treated with strict confidentiality. Your responses will be stored securely and analyzed in aggregate form. No personally identifiable information will be linked 
    to your responses. Any information that could potentially identify you will be removed or anonymized.
    <br><br> 

    <strong>Voluntary Participation:</strong><br>
    Participation in this study is completely voluntary. If you decide to participate, you are free to withdraw at any time without providing a reason. Your decision to participate or withdraw will be respected and will have no negative consequences.
    <br><br>
    Further information in details about the consent information can be found by following this link:  
    <a target='_blank' href='https://www.dnhi-lab.org/learning-about-other-minds-loam'>consent information</a>.

    <br><br> 

    <strong>By clicking the following button and continuing with the study, you confirm that you have read and understood the information provided in this consent form. You freely and voluntarily agree to participate in this study.</strong>
    </p>`,

    choices: ['I agree to participate in this study.'],
    css_classes: ['consent_style'],
    on_finish: function (data) {
        data.time_consent_end = new Date();
    },
};
timeline.push(consent);

/* Instruction */
const instruction_slides = [
        `
        <img src='img/Instruction_01.jpeg' class='instruction_img'></img>
        `,
        `
        <img src='img/Instruction_02.jpeg' class='instruction_img'></img>
        `,
        `
        <img src='img/Instruction_03.jpeg' class='instruction_img'></img>
        `,
    ];
var instructions = {
    data: {
        screen_id: 'instruction'
    },
    type: jsPsychInstructions,
    pages: instruction_slides,
    button_label_next: 'Next',
    button_label_previous: 'Previous',
    show_clickable_nav: true,
    css_classes: ['instruction_style'],
    on_finish: function (data) {
        data.time_instruction_end = new Date();
        data.frame = selected_frame;
    }
}
timeline.push(instructions);

/* ----------------------------------------------------------
/**  Setup Task  */

// Start Message
var task_start = {
    data: {
        screen_id: 'task-start'
    },
    type: jsPsychHtmlButtonResponse,
    stimulus: `<p class=instruction_style> 
            Great! You have finished the instruction session.<br><br>
            Now, please click 'Continue' to start the task.<br><br></p>`,
    choices: ['Continue']
};
timeline.push(task_start);

// 1. Fixation 
var fixation = {
    data: {
        screen_id: 'fixation'
    },
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div class=fixation_style>+</div>',
    choices: 'NO_KEYS',
    trial_duration: 1000,
    };

// 2. Test
// Main Task (with all three options)
var main_task = {
    data: {
        screen_id: 'main-task',
        question: jsPsych.timelineVariable('question'),
        type: jsPsych.timelineVariable('type'),
        frame: jsPsych.timelineVariable('frame'),
        main: true,
    },
    type: jsPsychHtmlButtonResponse,
    stimulus: function () {
        return `<p class='responsive_stimulus'>${jsPsych.timelineVariable('content')}</p>`;
    },
    choices: function () {
        return [
            jsPsych.timelineVariable('certain_option'),
            jsPsych.timelineVariable('uncertain_option'),
            neutral_option,
        ];
    },
    css_classes: ['main_task'], // Add class to target the main task buttons
    on_finish: function (data) {
        data.response_selected = data.response; // Record the choice index
    },
};

// Follow-up Task (only certain and uncertain)
var follow_up_task = {
    data: {
        screen_id: 'follow-up-task',
        question: jsPsych.timelineVariable('question'),
        type: jsPsych.timelineVariable('type'),
        frame: jsPsych.timelineVariable('frame'),
        follow_up: true,
    },
    type: jsPsychHtmlButtonResponse,
    stimulus: function () {
        return `<p class='instruction'>Now you see the same question again without the coin flipping option:</p>
                <p class='responsive_stimulus'>${jsPsych.timelineVariable('content')}</p>`;
    },
    choices: function () {
        return [
            jsPsych.timelineVariable('certain_option'),
            jsPsych.timelineVariable('uncertain_option'),
        ];
    },
    on_finish: function (data) {
        data.response_selected = data.response; // Record the choice index
    },
    css_classes: ['follow_up_task'], // Add class to target the follow-up task buttons
};

//3. Confidence evaluation
var evaluate_confidence = {
    data: {
        screen_id: 'confidence-evaluation'
    },
    type: jsPsychHtmlSliderResponseValue, // Xiong's plugin, show value on the chosen evaluation
    stimulus: '<span style="font-size: 22px;">How confident are you in the choice you just made?<br><br><br>',
    require_movement: true,
    button_label: ['Continue'],
    labels: ['<span class="label_style">0<br>extremely not confident</span>',
            '<span class="label_style">10</span>',
            '<span class="label_style">20</span>',
            '<span class="label_style">30</span>',
            '<span class="label_style">40</span>',
            '<span class="label_style">50</span>',
            '<span class="label_style">60</span>',
            '<span class="label_style">70</span>',
            '<span class="label_style">80</span>',
            '<span class="label_style">90</span>',
            '<span class="label_style">100<br>extremely confident</span>'],
    slider_number: true,
    slider_start: 50, // Starts at the middle point
};

/** ---------------------  Task procedure ------------------------------ */
var task_procedure = {
    timeline: [
        fixation,
        main_task, // Main task
        evaluate_confidence, 
        {
            timeline: [follow_up_task, evaluate_confidence], // Follow-up task
            conditional_function: function () {
                // Check if the neutral option was selected
                var last_response = jsPsych.data.get().last(2).values()[0].response; // Main task response
                console.log('Follow-Up Triggered:', last_response === 2); // Inspect if the follow-up task is triggered
                console.log('last_response:', last_response); // inspect the last response
                return last_response === 2; // Neutral option is at index 2
            },
        },
    ],
    timeline_variables: task_stimuli.filter(stimulus => stimulus.frame === selected_frame),
    randomize_order: false, // Ensure sequential presentation
};
timeline.push(task_procedure);

/* ----------------------------------------------------------
/* Survey 
------------------------------------------------------------ */
/** Survey start */ 
var survey_start = {
    data: {
        screen_id: 'survey-start'
    },
    type: jsPsychHtmlButtonResponse,
    stimulus: `<p class="instruction_style">Great job! You have completed the task.<br><br> 
                Now, please take a few minutes to complete a short survey.</p>`,
    choices: ['Continue'],
};
timeline.push(survey_start);

const survey_strategy = {
    data: {
        screen_id: 'strategy-questions'
    },
    type: jsPsychSurvey,
    survey_json: {
        showQuestionNumbers: true,
        title: 'Survey',
        completeText: 'Continue',
        elements: [
            {
                type: 'matrix',
                name: 'decision_strategy_matrix',
                title: 'Please evaluate how much you considered about the following aspects during the experiment.',
                alternateRows: true,
                isAllRowRequired: true,
                rows: [
                    {text: 'The questions matter to me.'},
                    {text: 'I feel responsible to make choices in these situations.'},
                    {text: 'Please click the rightmost button.'}, // catch trial
                    {text: 'I compare both options for each question and see how different they are to me.'},
                    {text: 'I need more information about the questions to make my decisions.'}
                ],
                columns: [
                    {'value': 5, 'text': 'Strongly disagree'},
                    {'value': 4, 'text': 'Disagree'},
                    {'value': 3, 'text': 'Neutral'},
                    {'value': 2, 'text': 'Agree'},
                    {'value': 1, 'text': 'Strongly agree'}
                ]
            },
            {
                type: 'text',
                name: 'additional_strategies',
                title: 'Please specify if you used additional strategies during the experiment. ',
            },
            {
                type: 'radiogroup',
                title: 'Have you previously encountered the type of question asked here (from your studies, from reading books, etc.)?',
                choices: ['Yes', 'No'],
                name: 'framing_awareness',
                isRequired: true,
            },
            {
                type: 'text',
                title: 'If yes, please explain.',
                name: 'framing_explanation',
                cssClasses: ['large-text-box'],
            },
            {
                type: 'text',
                title: 'Imagine you toss a fair coin. You get $10 for heads and $0 for tails. What is the average amount of money you would get per toss? (Enter only a number)',
                name: 'expected_value_check',
                cssClasses: ['large-text-box'],
                isRequired: true,
            },
        ]
    },
};
timeline.push(survey_strategy);

// Define demographic survey questions using survey_json format
const survey_demographic = {
    data: {
        screen_id: 'demographic-questions'
    },
    type: jsPsychSurvey,
    survey_json: {
        showQuestionNumbers: true,
        title: 'Survey',
        elements: [
            {
                type: 'html',
                title: 'Please answer the following demographic questions:',
                isRequired: true,
            },
            {
                type: 'text',
                title: 'How old are you?',
                name: 'age',
                inputType: 'number',
                isRequired: true,
            },
            {
                type: 'radiogroup',
                title: 'What is your gender identity?',
                name: 'gender',
                choices: ['Female', 'Male', 'Non-conforming', 'Prefer not to respond'],
                isRequired: true,
            },
            {
                type: 'radiogroup',
                title: 'Are you a native English speaker?',
                name: 'if_English_mother_language',
                choices: ['Yes', 'No'],
                isRequired: true,
            },
            {
                type: 'text',
                title: 'What is your nationality?',
                name: 'nationality',
                inputType: 'text',
                isRequired: true,
            },
            {
                type: 'dropdown',
                title: 'What is the highest level of education you have completed?',
                name: 'education_level',
                choices: ['Below high school', 'High school', "Bachelor's degree", "Master's Degree", 'Ph.D. or higher'],
                isRequired: true,
            },
            {
                type: 'radiogroup',
                title: 'Do you have any problems to understand the questions?',
                name: 'if_problem',
                choices: ['Yes', 'No'],
                isRequired: true,
            },
            {
                type: 'text',
                title: 'If yes, please specify which aspects or contents',
                name: 'problem_content',
                inputType: 'text',
            },
        ]
    },
    css_classes: ['question_style'],
    on_finish: function (data) {
        data.time_demoQ_end = new Date();
    }
};
timeline.push(survey_demographic)

var redirect_instruction = {
    data: {
        screen_id: 'redirect_instruction'
    },
    type: jsPsychHtmlButtonResponse,
    stimulus: `<p class="instruction_style"> The experiment is finished. <br><br> Thank you for your participation!</p>`,
    choices: ['Click here to finish']
};
timeline.push(redirect_instruction);


/** Finish connection with Pavlovia ---------------------------------------------------------*/
var pavlovia_finish = {
    type: jsPsychPavlovia, // Corrected type initialization for Pavlovia
    command: 'finish',
    participantId: prolific_id,
};
timeline.push(pavlovia_finish);

/** Redirect to Prolific */
var redirect = {
    data: {
        page_id: 'redirect',
    },
    type: jsPsychHtmlKeyboardResponse, 
    stimulus: `<p class="instruction_style"> Please wait for redirecting to Prolific.<br><br>
                Please click <span style='background-color: rgb(66, 133, 244); color: 
                white; padding: 2px 5px; border-radius: 3px;'>leave</span> if you see a dialog box.</p>`,
    choices: 'NO_KEYS',
    trial_duration: 2000,
    on_finish: function () {
        window.location = 'https://app.prolific.com/submissions/complete?cc=CTZL4OAG'; // Prolific Redirect URL
    }
};
timeline.push(redirect);

// Run the experiment
jsPsych.run(timeline);
