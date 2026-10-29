var jsPsychHtml2SliderResponse = (function (jspsych) {
  'use strict';

  const info = {
      name: "html-2slider-response",
      parameters: {
          /** The HTML string to be displayed */
          stimulus: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Stimulus",
              default: undefined,
          },
          /** Sets the minimum value of the slider. */
          min: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Min slider",
              default: 0,
          },
          /** Sets the maximum value of the slider */
          max: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Max slider",
              default: 100,
          },
          min2: {
            type: jspsych.ParameterType.INT,
            pretty_name: "Min2 slider",
            default: 0,
         },
         /** Sets the maximum value of the slider */
          max2: {
            type: jspsych.ParameterType.INT,
            pretty_name: "Max2 slider",
            default: 100,
          },
          /** Sets the starting value of the slider */
          slider_start: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Slider starting value",
              default: 50,
          },
          /** Sets the step of the slider */
          step: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Step",
              default: 1,
          },
          /** Array containing the labels for the slider. Labels will be displayed at equidistant locations along the slider. */
          labels: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Labels",
              default: [],
              array: true,
          },
          /** Width of the slider in pixels. */
          slider_width: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Slider width",
              default: null,
          },
          slider_start2: {
            type: jspsych.ParameterType.INT,
            pretty_name: "Slider starting value",
            default: 50,
         },
                /** Sets the step of the slider */
            step2: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Step2",
                default: 1,
            },
            /** Array containing the labels for the slider. Labels will be displayed at equidistant locations along the slider. */
            labels2: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Labels2",
                default: [],
                array: true,
            },
            /** Width of the slider in pixels. */
            slider_width2: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Slider width2",
                default: null,
            },
          /** Label of the button to advance. */
          button_label: {
              type: jspsych.ParameterType.STRING,
              pretty_name: "Button label",
              default: "Continue",
              array: false,
          },
          /** If true, the participant will have to move the slider before continuing. */
          require_movement: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Require movement",
              default: false,
          },
          /** Any content here will be displayed below the slider. */
          prompt: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Prompt",
              default: null,
          },
          /** Any content here will be displayed below the slider. */
          prompt2: {
            type: jspsych.ParameterType.HTML_STRING,
            pretty_name: "Prompt",
            default: null,
         },
          /** How long to show the stimulus. */
          stimulus_duration: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Stimulus duration",
              default: null,
          },
          /** How long to show the trial. */
          trial_duration: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Trial duration",
              default: null,
          },
          /** If true, trial will end when user makes a response. */
          response_ends_trial: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Response ends trial",
              default: true,
          },
          /** If true, slider number will be displayed as slider moves */
          /** for first slider: */
          slider_number: {
            type: jspsych.ParameterType.BOOL,
            default: false
         },
        /** for second slider */
          slider_number2: {
            type: jspsych.ParameterType.BOOL,
            default: false
          }
      },
  };
  
 /**
   * **html-2slider-response**
   *
   * jsPsych plugin for showing an HTML stimulus with two sliders
   * Addition of parameter option to show slider number that moves as slider moves
   *
   * @author Samantha Reisman (adapted from Josh de Leeuw, dynamic slider code adapted from modified from Gorka Navarrete)
   * @seeoriginal {@link https://www.jspsych.org/plugins/jspsych-html-slider-response/ html-slider-response plugin documentation on jspsych.org}
   * @seeTHISplugin {@link https://github.com/samanthareisman/jsPsych-plugins/blob/3f57c9b3c16cd861a9c78f98769279da74057074/plugin-html-2slider-response.js html-2slider-response plugin link on GitHub}
   */

  class Html2SliderResponsePlugin {
      constructor(jsPsych) {
          this.jsPsych = jsPsych;
      }
      trial(display_element, trial) {
          // half of the thumb width value from jspsych.css, used to adjust the label positions
          var half_thumb_width = 7.5;
          var html = '<div id="jspsych-html-2slider-response-wrapper" style="margin: 100px 0px;">';
          html += '<div id="jspsych-html-2slider-response-stimulus">' + trial.stimulus + "</div>";
          html +=
              '<div class="jspsych-html-2slider-response-container" style="position:relative; margin: 0 auto 3em auto; ';
          if (trial.slider_width !== null) {
              html += "width:" + trial.slider_width + "px;";
          }
          else {
              html += "width:auto;";
          }
          html += '">';
          html += 
            '<input type="range" value="' + 
            trial.slider_start + 
            '" min="' + 
            trial.min + 
            '" max="' + 
            trial.max + 
            '" step="' + 
            trial.step + 
            '" style="width: 100%;" id="jspsych-html-2slider-response-response" oninput="document.getElementById(&quot;output&quot;).value = this.value"></input>';
          if(trial.slider_number){
          html += 
          '<div style="font-weight: bold; vertical-align: top; width: 110%; text-align: right; position: relative; top: -30px; z-index: -1;"><output id = "output">50</output></div>';
          }

          for (var j = 0; j < trial.labels.length; j++) {
              var label_width_perc = 100 / (trial.labels.length - 1);
              var percent_of_range = j * (100 / (trial.labels.length - 1));
              var percent_dist_from_center = ((percent_of_range - 50) / 50) * 100;
              var offset = (percent_dist_from_center * half_thumb_width) / 100;
              html +=
                  '<div style="border: 1px solid transparent; display: inline-block; position: absolute; ' +
                      "left:calc(" +
                      percent_of_range +
                      "% - (" +
                      label_width_perc +
                      "% / 2) - " +
                      offset +
                      "px); text-align: center; width: " +
                      label_width_perc +
                      '%;">';
              html += '<span style="text-align: center; font-size: 80%;">' + trial.labels[j] + "</span>";
              html += "</div>";
          }
          if (trial.prompt !== null) {
              html += trial.prompt;
          }
          html += "</div>";
          html += "</div>";
        
          // add second slider
          html +=
              '<div class="jspsych-html-2slider-response-container" style="position:relative; margin: 0 auto 3em auto; ';
          if (trial.slider_width2 !== null) {
              html += "width:" + trial.slider_width2 + "px;";
          }
          else {
              html += "width:auto;";
          }
          html += '">';
          html += 
            '<input type="range" value="' + 
            trial.slider_start2 + 
            '" min="' + 
            trial.min2 + 
            '" max="' + 
            trial.max2 + 
            '" step="' + 
            trial.step2 + 
            '" style="width: 100%;" id="jspsych-html-2slider-response-response2" oninput="document.getElementById(&quot;output2&quot;).value = this.value"></input>';
          if(trial.slider_number2){
          html += 
          '<div style="font-weight: bold; vertical-align: top; width: 110%; text-align: right; position: relative; top: -30px; z-index: -1;"><output id = "output2">50</output2></div>';
          }

          for (var j = 0; j < trial.labels2.length; j++) {
              var label_width_perc = 100 / (trial.labels2.length - 1);
              var percent_of_range = j * (100 / (trial.labels2.length - 1));
              var percent_dist_from_center = ((percent_of_range - 50) / 50) * 100;
              var offset = (percent_dist_from_center * half_thumb_width) / 100;
              html +=
                  '<div style="border: 1px solid transparent; display: inline-block; position: absolute; ' +
                      "left:calc(" +
                      percent_of_range +
                      "% - (" +
                      label_width_perc +
                      "% / 2) - " +
                      offset +
                      "px); text-align: center; width: " +
                      label_width_perc +
                      '%;">';
              html += '<span style="text-align: center; font-size: 80%;">' + trial.labels2[j] + "</span>";
              html += "</div>";
          }
          if (trial.prompt2 !== null) {
              html += trial.prompt2;
          }

          // add submit button
          html +=
              '<button id="jspsych-html-2slider-response-next" class="jspsych-btn" ' +
                  (trial.require_movement ? "disabled" : "") +
                  ">" +
                  trial.button_label +
                  "</button>";
          display_element.innerHTML = html;
          var response = {
              rt: null,
              response: null,
          };
          if (trial.require_movement) {
              const enable_button = () => {
                  display_element.querySelector("#jspsych-html-2slider-response-next").disabled = false;
              };
              display_element
                  .querySelector("#jspsych-html-2slider-response-response2")
                  .addEventListener("mousedown", enable_button);
              display_element
                  .querySelector("#jspsych-html-2slider-response-response2")
                  .addEventListener("touchstart", enable_button);
              display_element
                  .querySelector("#jspsych-html-2slider-response-response2")
                  .addEventListener("change", enable_button);
          }
          const end_trial = () => {
              this.jsPsych.pluginAPI.clearAllTimeouts();
              // save data
              var trialdata = {
                  rt: response.rt,
                  stimulus: trial.stimulus,
                  slider_start: trial.slider_start,
                  slider_start2: trial.slider_start2,
                  response: response.response,
                  response2: response.response2
              };
              display_element.innerHTML = "";
              // next trial
              this.jsPsych.finishTrial(trialdata);
          };
          display_element
              .querySelector("#jspsych-html-2slider-response-next")
              .addEventListener("click", () => {
              // measure response time
              var endTime = performance.now();
              response.rt = Math.round(endTime - startTime);
              response.response = display_element.querySelector("#jspsych-html-2slider-response-response").valueAsNumber;
              response.response2 = display_element.querySelector("#jspsych-html-2slider-response-response2").valueAsNumber;
              if (trial.response_ends_trial) {
                  end_trial();
              }
              else {
                  display_element.querySelector("#jspsych-html-2slider-response-next").disabled = true;
              }
          });
          if (trial.stimulus_duration !== null) {
              this.jsPsych.pluginAPI.setTimeout(() => {
                  display_element.querySelector("#jspsych-html-2slider-response-stimulus").style.visibility = "hidden";
              }, trial.stimulus_duration);
          }
          // end trial if trial_duration is set
          if (trial.trial_duration !== null) {
              this.jsPsych.pluginAPI.setTimeout(end_trial, trial.trial_duration);
          }
          var startTime = performance.now();
      }
      simulate(trial, simulation_mode, simulation_options, load_callback) {
          if (simulation_mode == "data-only") {
              load_callback();
              this.simulate_data_only(trial, simulation_options);
          }
          if (simulation_mode == "visual") {
              this.simulate_visual(trial, simulation_options, load_callback);
          }
      }
      create_simulation_data(trial, simulation_options) {
          const default_data = {
              stimulus: trial.stimulus,
              slider_start: trial.slider_start,
              slider_start2: trial.slider_start2,
              response: this.jsPsych.randomization.randomInt(trial.min, trial.max),
              response2: this.jsPsych.randomization.randomInt(trial.min2, trial.max2),
              rt: this.jsPsych.randomization.sampleExGaussian(500, 50, 1 / 150, true),
          };
          const data = this.jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options);
          this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
          return data;
      }
      simulate_data_only(trial, simulation_options) {
          const data = this.create_simulation_data(trial, simulation_options);
          this.jsPsych.finishTrial(data);
      }
      simulate_visual(trial, simulation_options, load_callback) {
          const data = this.create_simulation_data(trial, simulation_options);
          const display_element = this.jsPsych.getDisplayElement();
          this.trial(display_element, trial);
          load_callback();
          if (data.rt !== null) {
              const el = display_element.querySelector("input[type='range']");
              setTimeout(() => {
                  this.jsPsych.pluginAPI.clickTarget(el);
                  el.valueAsNumber = data.response;
              }, data.rt / 2);
              this.jsPsych.pluginAPI.clickTarget(display_element.querySelector("button"), data.rt);
          }
      }
  }
  Html2SliderResponsePlugin.info = info;

  return Html2SliderResponsePlugin;

})(jsPsychModule);
