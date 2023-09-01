/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-no-shadow
import { useEffect, FC, useRef, useContext, useState } from "react";
import $ from "jquery";
import image from "../../assets/img/image.png";
import classes from "./styles.module.css";
import { TankProps } from "../../pages/Dashboard/types";
import { AiFillWarning } from "react-icons/ai";
import { AppContext } from "../../pages/appState";
import { useGetBatch } from "../../pages/hooks";
import { Spinner } from "reactstrap";

const Tank: FC<TankProps> = ({
     color,
     fillMaxValue,
     fillValue,
     type,
     title,
     threshold,
     temperature,
     temperatureColor,
     temperatureMsm,
     minimumTemperature,
     batchNumber,
     style,
}) => {
     const containerRef = useRef(null);
     const tankRef = useRef<any>(null);
     const { toggleBatchViewModal, setBatch } = useContext<{
          toggleBatchViewModal: () => void;
          setBatch: React.Dispatch<any>;
     }>(AppContext);
     const getBatch = useGetBatch();
     const [loading, setLoading] = useState(false);

     const classN = `${title}-${Math.random()}-${fillMaxValue}`.replace(" ", "_").replace(".", "_");

     useEffect(() => {
          /*eslint no-shadow: ["error", { "hoist": "functions" }]*/
          /*eslint-env es6*/
          (function ($) {
               $.fn.analogTank = function (config: any) {
                    let $this = $(this);
                    return new AnalogTank($this, config);
               };
               class AnalogTank {
                    constructor($this: any, config: any) {
                         const defaults = {
                              tankType: "tower", // available types: 'tower', 'round'
                              tankWidth: null, // outside width.
                              tankHeight: 100, // outside height.
                              fillPadding: null, // gap between perimeter and inside tank area that displays water.
                              borderWidth: 2, // perimeter width.
                              borderColor: "#", // outside border color. usually the perimeter of the tank
                              defaultFillColor: isTemperatureLow() ? "#DC3545" : color, // default water color. this is assigned to fillColor if water level does not pass any thresholds.
                              fillColor: null, // used later to set water color. it could be different color depending on situations.
                              backFillColor: "#fafafa", // background color inside the tank where there is no water.
                              backFillOpacity: 1, // opacity of the background.
                              innerCornerRadius: 3,
                              borderCornerRadius: 5,
                              innerWidth: null,
                              innerHeight: 100,
                              neckWidth: 50, // only applies to round tank
                              neckHeight: 50, // only applies to round tank
                              fillAnimationColor: null, // used later to set the color while animating.
                              fillMaxValue: fillMaxValue, // maximum possible value for the main text.
                              fillMinValue: 0, // minimum possible value for the main text.
                              fillValue: null, // value used to display the main text.
                              fillUnit: null, // unit that is appended to the main text.
                              decimal: 1, // number of decimal places for the main text.
                              overlayTextFillOpacity: 0.8, // opacity of the main text.
                              arrow: true, // arrow that is displayed to the right of the main text.
                              fontFamily: "Helvetica",
                              fontWeight: "bold",
                              fontSize: 20,
                              backFontColor: backFontColor,
                              backFontAnimationColor: null,
                              frontFontColor: null,
                              waveWidth: 100,
                              amplitude: 3,
                              horizontalWaveDuration: 2000,
                              transitionDuration: 1000,
                              delay: 0,
                              ease: ((window as any)?.d3 as any)?.easePolyInOut.exponent(4),
                              marker: true,
                              markerPosition: "in",
                              markerGap: [5, 3],
                              markerLabelXOffset: 0,
                              markerLabelYOffset: 0,
                              markerWidth: 2,
                              markerLength: 10,
                              topMarkerText: null,
                              topMarkerColor: "#133440",
                              topMarkerFontColor: "#133440",
                              bottomMarkerText: null,
                              bottomMarkerColor: "#133440",
                              bottomMarkerFontColor: "#133440",
                              markerFontSize: 10,
                              markerFontWeight: "bold",
                              markerFontFamily: "Helvetica",
                              enableSupportLabel: true,
                              supportLabelFontColor: "#133440",
                              supportLabelFontFamily: "Helvetica",
                              supportLabelFontWeight: "bold",
                              supportLabelFontSize: 14,
                              supportLabelText: "NA",
                              supportLabelYOffset: -1,
                              mergeSupportLabelToBorder: false,
                              dualSupportLabel: false,
                              topSupportLabelFontColor: "#133440",
                              topSupportLabelFontFamily: "Helvetica",
                              topSupportLabelFontWeight: "bold",
                              topSupportLabelFontSize: 14,
                              topSupportLabelText: "NA",
                              topSupportLabelYOffset: -1,
                              enableSupportLabelBg: true,
                              supportLabelBackgroundColor: "#fff",
                              supportLabelBackgroundOpacity: 0.7,
                              supportLabelBackgroundHeight: null,
                              supportLabelBackgroundWidth: null,
                              supportLabelBackgroundBorderWidth: 1,
                              supportLabelBackgroundBorderColor: null,
                              supportLabelPadding: 0,
                              supportLabelWidthFix: 0,
                              arrowName: null,
                              upArrowName: "\uf176",
                              downArrowName: "\uf175",
                              noArrowName: "\uf07e",
                              arrowFontFamily: "FontAwesome",
                              arrowFontWeight: "bold",
                              arrowFontSize: 12,
                              arrowXOffset: 3,
                              arrowYOffset: -1,
                              topFillBackArrowColor: null,
                              bottomFillBackArrowColor: null,
                              frontArrowColor: null,
                              backArrowColor: null,
                              markerBarXOffset: 3,
                              tooltipFontSize: 10,
                              thresholds: [],
                              lookupTableValue: null, // if lookup table value is set, a secondary text is displayed under the main text.
                              lookupTableValueUnit: null, // unit for lookupTableValue.
                              lookupTableValueDecimal: 0, // number of decimal places for lookup table value.
                              lookupTableValueEnabled: false,
                              lookupTableValueFontSize: 14,
                              lookupTableValueYOffset: 2,
                              changeRateValueArrowEnabled: false,
                              changeRateValueArrowYOffset: 0,
                              changeRateValue: null,
                              changeRateValueDecimal: 0,
                              changeRateValueEnabled: true,
                              changeRateValueFontSize: 14,
                              changeRateValueYOffset: 2,
                              changeRateValueUnit: "kg",
                         };

                         Object.assign(defaults, config);

                         (this as any).container = $this as any;
                         Object.assign(this, defaults);
                         (this as any).url = window.location.href;

                         if (
                              (this as any).tankType !== "tower" &&
                              (this as any).tankType !== "round"
                         ) {
                              throw new Error(
                                   `Unknown Tank Type specified: ${
                                        (this as any).tankType
                                   }. Should be either 'tower' or 'round'.`,
                              );
                         }
                         (this as any).init();
                    }

                    // initializer
                    init() {
                         (this as any).setInitialValues();
                         (this as any).drawSvgContainer();

                         (this as any).initTower();

                         (this as any).setMarkerAttributes();
                         (this as any).calculateDimensions();
                         (this as any).setGaugeScale();
                         (this as any).getNewHeight();
                         (this as any).addThresholdMarkers();
                         (this as any).applyFillAttributes();
                         (this as any).applyTextAttributes();
                         (this as any).applyWaveHorizontalAttributes();
                         (this as any).applySupportLabelAttributes();
                         (this as any).updateArrowPosition();
                         (this as any).tweenWaveHorizontal();
                         (this as any).animateFromZero();
                         (this as any).repositionElements();
                         (this as any).setBisector();
                         (this as any).hover();
                    }

                    drawSvgContainer() {
                         (this as any).width = (this as any).container.outerWidth();
                         (this as any).height = (this as any).container.outerHeight();
                         let viewBoxDef = `0, 0, ${(this as any).width}, ${(this as any).height}`;

                         (this as any).svgContainer = (window as any)?.d3
                              .select((this as any).container[0])
                              .attr("id", "svg-container")
                              .append("svg")
                              .attr("width", "100%")
                              .attr("height", "10000%")
                              .attr("viewBox", viewBoxDef);

                         (this as any).bodyGroup = (this as any).svgContainer
                              .append("g")
                              .attr("id", "body-group")
                              .attr(
                                   "transform",
                                   `translate(${(this as any).width / 2}, ${
                                        (this as any).height / 2
                                   })`,
                              );
                    }

                    // scale that returns pixel value for positioning the waveClip vertically
                    setGaugeScale() {
                         (this as any).gaugeScale = (window as any)?.d3
                              .scaleLinear()
                              .domain([(this as any).fillMinValue, (this as any).fillMaxValue])
                              .range([
                                   ((this as any).innerHeight + (this as any).amplitude) / 2,
                                   -((this as any).innerHeight + (this as any).amplitude) / 2,
                              ])
                              .clamp(true);
                    }

                    getNewHeight() {
                         (this as any).newHeight =
                              (this as any).fillValue === null
                                   ? 0
                                   : (this as any).gaugeScale((this as any).fillValue);
                    }

                    initTower() {
                         let uniqId = (this as any).uniqId();
                         // (this as any).tankGroup = (this as any).bodyGroup.append('g').attr('id', 'tank-group');
                         (this as any).waveClip = (this as any).bodyGroup
                              .append("defs")
                              .append("clipPath")
                              .attr("id", uniqId);
                         (this as any).waveHorizontal = (this as any).waveClip.append("path");

                         (this as any).backFill = (this as any).bodyGroup
                              .append("rect")
                              .attr("id", "back-fill");
                         (this as any).border = (this as any).bodyGroup
                              .append("rect")
                              .attr("id", "border");
                         (this as any).behindText = (this as any).bodyGroup
                              .append("text")
                              .attr("id", "behind-text");
                         (this as any).behindArrow = (this as any).bodyGroup
                              .append("text")
                              .attr("id", "behind-arrow");

                         if ((this as any).lookupTableValueEnabled) {
                              (this as any).lookupTableValueBehindText = (this as any).bodyGroup
                                   .append("text")
                                   .attr("id", "lookup-value-behind-text");
                         }

                         if ((this as any).changeRateValueEnabled) {
                              (this as any).changeRateValueBehindText = (this as any).bodyGroup
                                   .append("text")
                                   .attr("id", "change-rate-value-behind-text");
                         }

                         (this as any).waveGroup = (this as any).bodyGroup
                              .append("g")
                              .attr("clip-path", (this as any).getUniqUrl(uniqId));
                         (this as any).waterFill = (this as any).waveGroup
                              .append("rect")
                              .attr("id", "water-fill");

                         (this as any).overlayText = (this as any).waveGroup
                              .append("text")
                              .attr("id", "overlay-text");
                         (this as any).overlayArrow = (this as any).waveGroup
                              .append("text")
                              .attr("id", "overlay-arrow");

                         if ((this as any).lookupTableValueEnabled) {
                              (this as any).lookupTableValueOverlayText = (this as any).waveGroup
                                   .append("text")
                                   .attr("id", "lookup-value-overlay-text");
                         }

                         if ((this as any).changeRateValueEnabled) {
                              (this as any).changeRateValueOverlayText = (this as any).waveGroup
                                   .append("text")
                                   .attr("id", "change-rate-value-overlay-text");
                         }

                         (this as any).supportLabelGroup = (this as any).bodyGroup
                              .append("g")
                              .attr("id", "support-label-group");
                         (this as any).supportLabelBg = (this as any).supportLabelGroup
                              .append("rect")
                              .attr("id", "support-label-bg");
                         (this as any).supportLabel = (this as any).supportLabelGroup
                              .append("text")
                              .attr("id", "overlay-support-label");
                         (this as any).topSupportLabel = (this as any).supportLabelGroup
                              .append("text")
                              .attr("id", "top-overlay-support-label");

                         (this as any).topMarkerLabel = (this as any).bodyGroup
                              .append("text")
                              .attr("id", "top-marker-label");
                         (this as any).bottomMarkerLabel = (this as any).bodyGroup
                              .append("text")
                              .attr("id", "bottom-marker-label");
                         (this as any).markerBarGroup = (this as any).bodyGroup
                              .append("g")
                              .attr("id", "marker-bar-group");
                         // for debug purpose
                         // (this as any).bodyGroup.append('path').attr('d', 'M-${(this as any).height/2} 0 L ${(this as any).height} 0').attr('stroke-width', 1).attr('stroke', 'red');
                    }

                    // sets the inital text and color to display based on fillValue
                    setInitialValues() {
                         (this as any).lookupTableValueEnabled =
                              (this as any).lookupTableValue !== null ? true : false;
                         (this as any).changeRateValueEnabled =
                              (this as any).changeRateValue !== null ? true : false;

                         (this as any).fillColor = (this as any).defaultFillColor;

                         (this as any).topMarkerText =
                              (this as any).topMarkerText === null
                                   ? (this as any).fillMaxValue.toString()
                                   : (this as any).topMarkerText;
                         (this as any).bottomMarkerText =
                              (this as any).bottomMarkerText === null
                                   ? (this as any).fillMinValue.toString()
                                   : (this as any).bottomMarkerText;
                         (this as any).topMarkerFontColor =
                              (this as any).tankType === "tower" ? "#000" : "#fafafa";
                         (this as any).bottomMarkerFontColor =
                              (this as any).tankType === "tower" ? "#000" : "#fafafa";
                    }

                    setMarkerAttributes() {
                         (this as any).applyAttributes((this as any).topMarkerLabel, {
                              "text-anchor": "end",
                              "font-family": (this as any).markerFontFamily,
                              "font-size": `${(this as any).markerFontSize}px`,
                              fill: (this as any).topMarkerFontColor,
                              "font-weight": (this as any).markerFontWeight,
                              text: (this as any).topMarkerText,
                         });

                         (this as any).applyAttributes((this as any).bottomMarkerLabel, {
                              "text-anchor": "end",
                              "font-family": (this as any).markerFontFamily,
                              "font-size": `${(this as any).markerFontSize}px`,
                              fill: (this as any).bottomMarkerFontColor,
                              "font-weight": (this as any).markerFontWeight,
                              text: (this as any).bottomMarkerText,
                         });
                    }

                    calculateDimensions() {
                         (this as any).markerLabelWidth = (this as any).getMaxWidth(
                              (this as any).topMarkerLabel,
                              (this as any).bottomMarkerLabel,
                         );
                         let markerGapSum = (this as any).markerGap[0] + (this as any).markerGap[1];

                         if ((this as any).tankType === "tower") {
                              (this as any).tankWidth =
                                   (this as any).width - (this as any).borderWidth;
                              (this as any).tankHeight =
                                   (this as any).height - (this as any).borderWidth;

                              if (
                                   (this as any).fillPadding !== null &&
                                   typeof (this as any).fillPadding === "number" &&
                                   (this as any).fillPadding !== 0
                              ) {
                                   (this as any).innerWidth =
                                        (this as any).tankWidth - 2 * (this as any).fillPadding; // in case there is a padding, this will be the inner fill part
                                   (this as any).innerHeight =
                                        (this as any).tankHeight - 2 * (this as any).fillPadding; // same as above
                              } else {
                                   (this as any).innerWidth =
                                        (this as any).tankWidth - (this as any).borderWidth;
                                   (this as any).innerHeight =
                                        (this as any).tankHeight - (this as any).borderWidth;
                              }
                         } else if ((this as any).tankType === "round") {
                              (this as any).tankWidth =
                                   (this as any).width -
                                   2 * ((this as any).borderWidth + (this as any).markerLabelWidth); // this is how wide the tank will draw
                              (this as any).tankHeight =
                                   (this as any).height -
                                   (this as any).borderWidth -
                                   (this as any).neckHeight; // this is how tall the round part of the tank will draw

                              if (
                                   (this as any).fillPadding !== null &&
                                   typeof (this as any).fillPadding === "number" &&
                                   (this as any).fillPadding !== 0
                              ) {
                                   (this as any).innerWidth =
                                        (this as any).tankWidth - 2 * (this as any).fillPadding; // in case there is a padding, this will be the inner fill part
                                   (this as any).innerHeight =
                                        (this as any).tankHeight - 2 * (this as any).fillPadding; // same as above
                              } else {
                                   (this as any).innerWidth =
                                        (this as any).tankWidth - (this as any).borderWidth;
                                   (this as any).innerHeight =
                                        (this as any).tankHeight - (this as any).borderWidth;
                              }

                              //subtract the support height use the minimum value
                              (this as any).tankRx = (this as any).tankWidth / 2;
                              (this as any).tankRy = (this as any).tankHeight / 2;
                              (this as any).innerRx = (this as any).innerWidth / 2;
                              (this as any).innerRy = (this as any).innerHeight / 2;
                         }
                    }

                    addThresholdMarkers() {
                         const topPixelPosition =
                              (this as any).gaugeScale((this as any).fillMaxValue) +
                              (this as any).borderWidth;
                         const color = (this as any).tankType === "round" ? "#fafafa" : "#000";

                         if ((this as any).tankType === "round") {
                              (this as any).markerBarGroup
                                   .append("line")
                                   .attr("id", "top-edge-marker")
                                   .attr("x1", -(this as any).markerLength - 4)
                                   .attr("x2", 1)
                                   .attr("y1", topPixelPosition)
                                   .attr("y2", topPixelPosition)
                                   .attr("stroke-width", 1)
                                   .attr("stroke", color)
                                   .attr("stroke-linecap", "round");

                              const bottomPixelPosition =
                                   (this as any).gaugeScale((this as any).fillMinValue) -
                                   (this as any).borderWidth;
                              (this as any).markerBarGroup
                                   .append("line")
                                   .attr("id", "bottom-edge-marker")
                                   .attr("x1", -(this as any).markerLength - 4)
                                   .attr("x2", 1)
                                   .attr("y1", bottomPixelPosition)
                                   .attr("y2", bottomPixelPosition)
                                   .attr("stroke-width", 1)
                                   .attr("stroke", color)
                                   .attr("stroke-linecap", "round");

                              (this as any).markerBar = (this as any).markerBarGroup
                                   .append("line")
                                   .attr("id", "marker-bar")
                                   .attr("x1", 1)
                                   .attr("x2", 1)
                                   .attr("y1", topPixelPosition)
                                   .attr("y2", bottomPixelPosition)
                                   .attr("stroke-width", 1)
                                   .attr("stroke", color);
                         }

                         (this as any).thresholdMarkerPositions = [];
                         (this as any).thresholdTooltips = [];
                         (this as any).thresholdMarkers = [];

                         (this as any).thresholds.forEach((threshold: any, i: number) => {
                              const id = (this as any).uniqId();
                              const pixelPosition = (this as any).gaugeScale(threshold.value);

                              const marker = (this as any).markerBarGroup
                                   .append("line")
                                   .datum({
                                        yCoord: pixelPosition,
                                        strokeWidth: (this as any).markerWidth,
                                        x1: -(this as any).markerLength,
                                   })
                                   .attr("id", `threshold-marker-${id}`)
                                   .attr("x1", -(this as any).markerLength)
                                   .attr("x2", 0)
                                   .attr("y1", pixelPosition)
                                   .attr("y2", pixelPosition)
                                   .attr("stroke-width", (this as any).markerWidth)
                                   .attr("stroke", threshold.alarm ? "red" : color);

                              const tooltip = (window as any)?.d3
                                   .select((this as any).container[0])
                                   .append("div")
                                   .datum({
                                        name: threshold.name,
                                        value: threshold.value,
                                        type: threshold.type,
                                   })
                                   .html(function (d: any) {
                                        return (
                                             "<div>Name: " +
                                             d.name +
                                             "</div>" +
                                             "<div>Value: " +
                                             d.value +
                                             "</div>" +
                                             "<div>Type: " +
                                             d.type +
                                             "</div>"
                                        );
                                   })
                                   .attr("id", `tooltip-${id}`)
                                   .style("position", "absolute")
                                   .style("right", `${(this as any).markerLabelWidth * 2}px`)
                                   .style(
                                        "top",
                                        `${pixelPosition + (this as any).innerHeight / 2 - 30}px`,
                                   )
                                   .style("padding", "8px")
                                   .style("background", "rgba(97,97,97,0.9)")
                                   .style("color", "#fff")
                                   .style(
                                        "font-family",
                                        "'Roboto', 'Helvetica', 'Arial', sans-serif",
                                   )
                                   .style("font-size", "10px")
                                   .style("display", "initial")
                                   .style(
                                        "-webkit-animation",
                                        "pulse 200ms cubic-bezier(0, 0, 0.2, 1) forwards",
                                   )
                                   .style(
                                        "animation",
                                        "pulse 200ms cubic-bezier(0, 0, 0.2, 1) forwards",
                                   );

                              if ((this as any).thresholdMarkers.length > 0) {
                                   (this as any).thresholdMarkerPositions.push({
                                        yCoord:
                                             ((this as any).thresholdMarkers[i - 1].datum().yCoord +
                                                  pixelPosition) /
                                             2,
                                   });
                              }

                              (this as any).thresholdTooltips.push(tooltip);
                              (this as any).thresholdMarkers.push(marker);

                              tooltip.style("display", "none");
                         });
                    }

                    applyFillAttributes() {
                         if ((this as any).tankType === "tower") {
                              (this as any).applyAttributes((this as any).backFill, {
                                   x: 0,
                                   y: 0,
                                   width: (this as any).innerWidth,
                                   height: (this as any).innerHeight,
                                   rx: (this as any).innerCornerRadius,
                                   ry: (this as any).innerCornerRadius,
                                   fill: (this as any).backFillColor,
                                   "fill-opacity": (this as any).backFillOpacity,
                                   transform: `translate(-${
                                        ((this as any).tankWidth - (this as any).borderWidth) / 2
                                   }, -${
                                        ((this as any).tankHeight - (this as any).borderWidth) / 2
                                   })`,
                              });

                              (this as any).applyAttributes((this as any).waterFill, {
                                   datum: { color: (this as any).fillColor },
                                   x: 0,
                                   y: 0,
                                   width: (this as any).innerWidth,
                                   height: (this as any).innerHeight,
                                   rx: (this as any).innerCornerRadius,
                                   ry: (this as any).innerCornerRadius,
                                   fill: function (d: any) {
                                        return d.color;
                                   },
                                   transform: `translate(-${
                                        ((this as any).tankWidth - (this as any).borderWidth) / 2
                                   }, -${
                                        ((this as any).tankHeight - (this as any).borderWidth) / 2
                                   })`,
                              });

                              (this as any).applyAttributes((this as any).border, {
                                   x: 0,
                                   y: 0,
                                   width: (this as any).tankWidth,
                                   height: (this as any).tankHeight,
                                   rx: (this as any).borderCornerRadius,
                                   ry: (this as any).borderCornerRadius,
                                   "fill-opacity": 0,
                                   stroke: (this as any).borderColor,
                                   "stroke-width": (this as any).borderWidth,
                                   transform: `translate(-${(this as any).tankWidth / 2}, -${
                                        (this as any).tankHeight / 2
                                   })`,
                              });
                         } else if ((this as any).tankType === "round") {
                              (this as any).applyAttributes((this as any).tankGroup, {
                                   transform: `translate(0, -${
                                        (this as any).height / 2 -
                                        (this as any).tankRy -
                                        (this as any).borderWidth / 2
                                   })`,
                              });

                              (this as any).applyAttributes((this as any).backFill, {
                                   cx: 0,
                                   cy: 0,
                                   rx: (this as any).innerRx,
                                   ry: (this as any).innerRy,
                                   fill: (this as any).backFillColor,
                              });

                              (this as any).applyAttributes((this as any).waterFill, {
                                   datum: { color: (this as any).fillColor },
                                   cx: 0,
                                   cy: 0,
                                   rx: (this as any).innerRx,
                                   ry: (this as any).innerRy,
                                   fill: (this as any).fillColor,
                              });

                              (this as any).applyAttributes((this as any).border, {
                                   cx: 0,
                                   cy: 0,
                                   rx: (this as any).tankRx,
                                   ry: (this as any).tankRy,
                                   "fill-opacity": 0,
                                   stroke: (this as any).borderColor,
                                   "stroke-width": (this as any).borderWidth,
                              });

                              const xCoord = (this as any).getXCoordOfEllipse(
                                   ((this as any).tankRy / 8) * 7,
                              );

                              const topRight = `${xCoord} ${((this as any).tankRy / 8) * 7}`;
                              const bottomRight = `${(this as any).tankRx / 4} ${
                                   (this as any).height -
                                   (this as any).tankRy -
                                   (this as any).borderWidth / 2
                              }`;

                              const topLeft = `-${xCoord} ${((this as any).tankRy / 8) * 7}`;
                              const bottomLeft = `-${(this as any).tankRx / 4} ${
                                   (this as any).height -
                                   (this as any).tankRy -
                                   (this as any).borderWidth / 2
                              }`;

                              const topRightInflectionPt = `${(this as any).tankRx / 4} ${
                                   (this as any).tankRy
                              }`;
                              const bottomRightInflectionPt = `${(this as any).tankRx / 4} ${
                                   (this as any).tankRy
                              }`;
                              const topLeftInflectionPt = `-${(this as any).tankRx / 4} ${
                                   (this as any).tankRy
                              }`;
                              const bottomLeftInflectionPt = `-${(this as any).tankRx / 4} ${
                                   (this as any).tankRy
                              }`;

                              // for debug purpose
                              // const topRightInfxPt = (this as any).tankGroup.append('circle').attr('r', 2).attr('fill','red').attr('transform', `translate(${topRightInflectionPt})`);
                              // const bottomRightInfxPt = (this as any).tankGroup.append('circle').attr('r', 2).attr('fill','red').attr('transform', `translate(${bottomRightInflectionPt})`);

                              const neckFillPathDef = `M${topRight}, C${topRightInflectionPt}, ${bottomRightInflectionPt}, ${bottomRight}, L${bottomLeft}, C${bottomLeftInflectionPt}, ${topLeftInflectionPt}, ${topLeft} Z`;
                              const neckBorderDef = `M${topRight}, C${topRightInflectionPt}, ${bottomRightInflectionPt}, ${bottomRight}, L${bottomLeft}, C${bottomLeftInflectionPt}, ${topLeftInflectionPt}, ${topLeft}`;

                              (this as any).applyAttributes((this as any).neckFill, {
                                   datum: { color: (this as any).fillColor },
                                   d: neckFillPathDef,
                                   fill: (this as any).fillColor,
                              });

                              (this as any).applyAttributes((this as any).neckBorder, {
                                   d: neckBorderDef,
                                   stroke: (this as any).borderColor,
                                   fill: "transparent",
                                   "stroke-width": (this as any).borderWidth,
                              });

                              (this as any).applyAttributes((this as any).neckBackFill, {
                                   d: neckFillPathDef,
                                   fill: (this as any).backFillColor,
                                   "stroke-width": 0,
                              });
                         }
                    }

                    applyTextAttributes() {
                         const transform = `translate(0, ${(this as any).fontSize / 4})`;

                         (this as any).applyAttributes((this as any).behindText, {
                              datum: {
                                   color:
                                        (this as any).backFontColor === null
                                             ? (this as any).fillColor
                                             : (this as any).backFontColor,
                              },
                              "text-anchor": "middle",
                              "font-family": (this as any).fontFamily,
                              "font-size": `${(this as any).fontSize}px`,
                              "font-weight": (this as any).fontWeight,
                              fill: function (d: any) {
                                   return d.color;
                              },
                              text: `0 ${(this as any).fillUnit}`,
                              transform: transform,
                         });

                         (this as any).applyAttributes((this as any).behindArrow, {
                              datum: {
                                   color:
                                        (this as any).backFontColor === null
                                             ? (this as any).fillColor
                                             : (this as any).backFontColor,
                              },
                              "text-anchor": "middle",
                              "font-family": (this as any).arrowFontFamily,
                              "font-size": `${(this as any).arrowFontSize}px`,
                              "font-weight": (this as any).arrowFontWeight,
                              fill: function (d: any) {
                                   return d.color;
                              },
                              text: `${
                                   (this as any).arrowName === null
                                        ? (this as any).noArrowName
                                        : (this as any).arrowName
                              }`,
                         });

                         (this as any).applyAttributes((this as any).overlayText, {
                              datum: {
                                   color:
                                        (this as any).frontFontColor === null
                                             ? "#fff"
                                             : (this as any).frontFontColor,
                              },
                              "text-anchor": "middle",
                              "font-family": (this as any).fontFamily,
                              "font-size": `${(this as any).fontSize}px`,
                              "font-weight": (this as any).fontWeight,
                              fill: function (d: any) {
                                   return d.color;
                              },
                              "fill-opacity": (this as any).overlayTextFillOpacity,
                              text: `0 ${(this as any).fillUnit}`,
                              transform: transform,
                         });

                         (this as any).applyAttributes((this as any).overlayArrow, {
                              datum: { color: (this as any).frontFontColor },
                              "text-anchor": "middle",
                              "font-family": (this as any).arrowFontFamily,
                              "font-size": `${(this as any).arrowFontSize}px`,
                              "font-weight": (this as any).arrowFontWeight,
                              fill: function (d: any) {
                                   return d.color;
                              },
                              text: `${
                                   (this as any).arrowName === null
                                        ? (this as any).noArrowName
                                        : (this as any).arrowName
                              }`,
                         });

                         if ((this as any).lookupTableValueEnabled) {
                              const lookupTransform = `translate(0, ${
                                   (this as any).fontSize / 4 +
                                   (this as any).lookupTableValueFontSize +
                                   (this as any).lookupTableValueYOffset
                              })`;

                              (this as any).applyAttributes(
                                   (this as any).lookupTableValueBehindText,
                                   {
                                        datum: {
                                             color:
                                                  (this as any).backFontColor === null
                                                       ? (this as any).fillColor
                                                       : (this as any).backFontColor,
                                        },
                                        "text-anchor": "middle",
                                        "font-family": (this as any).fontFamily,
                                        "font-size": `${(this as any).lookupTableValueFontSize}px`,
                                        "font-weight": (this as any).fontWeight,
                                        fill: function (d: any) {
                                             return d.color;
                                        },
                                        text: `0 ${(this as any).lookupTableValueUnit}`,
                                        transform: lookupTransform,
                                   },
                              );

                              (this as any).applyAttributes(
                                   (this as any).lookupTableValueOverlayText,
                                   {
                                        datum: {
                                             color:
                                                  (this as any).frontFontColor === null
                                                       ? "#fff"
                                                       : (this as any).frontFontColor,
                                        },
                                        "text-anchor": "middle",
                                        "font-family": (this as any).fontFamily,
                                        "font-size": `${(this as any).lookupTableValueFontSize}px`,
                                        "font-weight": (this as any).fontWeight,
                                        fill: function (d: any) {
                                             return d.color;
                                        },
                                        "fill-opacity": (this as any).overlayTextFillOpacity,
                                        text: `0 ${(this as any).lookupTableValueUnit}`,
                                        transform: lookupTransform,
                                   },
                              );
                         }

                         if ((this as any).changeRateValueEnabled) {
                              let yOffset =
                                   (this as any).fontSize / 4 +
                                   (this as any).changeRateValueFontSize +
                                   (this as any).changeRateValueYOffset;

                              if ((this as any).lookupTableValueEnabled) {
                                   yOffset +=
                                        (this as any).lookupTableValueFontSize +
                                        (this as any).lookupTableValueYOffset;
                              }

                              const rateTransform = `translate(0, ${yOffset})`;

                              (this as any).applyAttributes(
                                   (this as any).changeRateValueBehindText,
                                   {
                                        datum: {
                                             color:
                                                  (this as any).backFontColor === null
                                                       ? (this as any).fillColor
                                                       : (this as any).backFontColor,
                                        },
                                        "text-anchor": "middle",
                                        "font-family": (this as any).fontFamily,
                                        "font-size": `${(this as any).changeRateValueFontSize}px`,
                                        "font-weight": (this as any).fontWeight,
                                        fill: function (d: any) {
                                             return d.color;
                                        },
                                        text: `0 ${(this as any).changeRateValueUnit}`,
                                        transform: rateTransform,
                                   },
                              );

                              (this as any).applyAttributes(
                                   (this as any).changeRateValueOverlayText,
                                   {
                                        datum: {
                                             color:
                                                  (this as any).frontFontColor === null
                                                       ? "#fff"
                                                       : (this as any).frontFontColor,
                                        },
                                        "text-anchor": "middle",
                                        "font-family": (this as any).fontFamily,
                                        "font-size": `${(this as any).changeRateValueFontSize}px`,
                                        "font-weight": (this as any).fontWeight,
                                        fill: function (d: any) {
                                             return d.color;
                                        },
                                        "fill-opacity": (this as any).overlayTextFillOpacity,
                                        text: `0 ${(this as any).changeRateValueUnit}`,
                                        transform: rateTransform,
                                   },
                              );
                         }
                    }

                    applyWaveHorizontalAttributes() {
                         (this as any).clipDef = `M0 0 Q${(this as any).waveWidth / 2} ${
                              (this as any).amplitude
                         }, ${(this as any).waveWidth} 0 T${2 * (this as any).waveWidth} 0`;
                         const minRequiredClipWidth =
                              (this as any).width * 2 +
                              2 * (this as any).waveWidth +
                              (this as any).borderWidth / 2;
                         (this as any).clipWidth = 2 * (this as any).waveWidth;

                         while ((this as any).clipWidth < minRequiredClipWidth) {
                              (this as any).clipWidth += (this as any).waveWidth;
                              (this as any).clipDef += ` T${(this as any).clipWidth} 0`;
                              (this as any).clipWidth += (this as any).waveWidth;
                              (this as any).clipDef += ` T${(this as any).clipWidth} 0`;
                         }
                         (this as any).clipDefArray = [
                              (this as any).clipDef,
                              `L${(this as any).clipWidth}`,
                              `${(this as any).height}`,
                              "L0",
                              `${(this as any).height}`,
                              "Z",
                         ];
                         (this as any).clipDef = (this as any).clipDefArray.join(" ");

                         (this as any).applyAttributes((this as any).waveHorizontal, {
                              d: (this as any).clipDef,
                         });
                    }

                    applySupportLabelAttributes() {
                         (this as any).applyAttributes((this as any).supportLabelBg, {
                              datum: { color: (this as any).fillColor },
                              width: 50,
                              height: 50,
                              rx: (this as any).innerCornerRadius,
                              ry: (this as any).innerCornerRadius,
                              fill: "#fafafa",
                              "fill-opacity": (this as any).supportLabelBackgroundOpacity,
                              stroke: function (d: any) {
                                   return d.color;
                              },
                              "stroke-width": (this as any).supportLabelBackgroundBorderWidth,
                         });

                         (this as any).applyAttributes((this as any).supportLabel, {
                              "text-anchor": "middle",
                              "font-family": (this as any).supportLabelFontFamily,
                              "font-size": `${(this as any).supportLabelFontSize}px`,
                              fill: (this as any).supportLabelFontColor,
                              "font-weight": (this as any).supportLabelFontWeight,
                              text: `${(this as any).supportLabelText}`,
                         });

                         (this as any).applyAttributes((this as any).topSupportLabel, {
                              "text-anchor": "middle",
                              "font-family": (this as any).supportLabelFontFamily,
                              "font-size": `${(this as any).topSupportLabelFontSize}px`,
                              fill: (this as any).supportLabelFontColor,
                              "font-weight": (this as any).supportLabelFontWeight,
                              text: `${(this as any).topSupportLabelText}`,
                         });
                    }

                    tweenWaveHorizontal() {
                         let that = this as any;
                         const startHeight =
                              ((this as any).tankHeight - (this as any).innerHeight) / 2 -
                              (this as any).amplitude / 2;
                         const transformStart = `translate(-${
                              (this as any).width + 2 * (this as any).waveWidth
                         }, ${startHeight})`;
                         const transformEnd = `translate(-${(this as any).width}, ${startHeight})`;

                         (this as any).waveHorizontal.attr("transform", transformStart);

                         animate();

                         function animate() {
                              (that as any).waveHorizontal
                                   .transition()
                                   .duration((that as any).horizontalWaveDuration)
                                   .ease((window as any)?.d3.easeLinear)
                                   .attrTween("transform", function (d: any) {
                                        return (window as any)?.d3.interpolateString(
                                             transformStart,
                                             transformEnd,
                                        );
                                   })
                                   .on("end", function (d: any) {
                                        animate();
                                   });
                         }
                    }

                    animateFromZero() {
                         (this as any).waveClip
                              .datum({
                                   transform: `translate(0, ${
                                        (this as any).gaugeScale((this as any).fillMinValue) +
                                        (this as any).amplitude
                                   })`,
                              })
                              .attr("transform", function (d: any) {
                                   return d.transform;
                              });
                         (this as any).animateNewHeight((this as any).fillValue);
                    }

                    animateNewHeight(val) {
                         let that = this as any;
                         if (typeof val !== "undefined") {
                              (this as any).newHeight = (this as any).gaugeScale(val);
                              (this as any).fillValue = val;
                         }

                         (this as any).tweenWaveVertical();
                         (this as any).tweenElements();
                    }

                    tweenWaveVertical() {
                         let endTransform = `translate(0, ${(this as any).newHeight})`;

                         return (this as any).waveClip
                              .transition()
                              .delay((this as any).delay)
                              .duration((this as any).transitionDuration)
                              .ease((this as any).ease)
                              .attrTween("transform", function (d: any) {
                                   let interpolator = (window as any)?.d3.interpolateString(
                                        d.transform,
                                        endTransform,
                                   );

                                   return function (t) {
                                        d.transform = interpolator(t);
                                        return d.transform;
                                   };
                              });
                    }

                    calculateColor() {
                         (this as any).fillAnimationColor =
                              (this as any).fillColor === null
                                   ? (this as any).defaultFillColor
                                   : (this as any).fillColor;
                         (this as any).backFontAnimationColor =
                              (this as any).backFontColor === null
                                   ? (this as any).fillColor
                                   : (this as any).backFontColor;
                         (this as any).backArrowAnimationColor =
                              (this as any).backArrowColor === null
                                   ? (this as any).fillColor
                                   : (this as any).backArrowColor;
                    }

                    tweenElements() {
                         (this as any).calculateColor();
                         (this as any).colorTransition(
                              (this as any).waterFill,
                              "fill",
                              (this as any).fillAnimationColor,
                         );
                         (this as any).colorTransition(
                              (this as any).supportLabelBg,
                              "stroke",
                              (this as any).fillAnimationColor,
                         );
                         (this as any).tweenText();

                         if ((this as any).arrow === true) {
                              (this as any).colorTransition(
                                   (this as any).behindArrow,
                                   "fill",
                                   (this as any).backArrowAnimationColor,
                              );
                              (this as any).colorTransition(
                                   (this as any).overlayArrow,
                                   "fill",
                                   (this as any).frontArrowColor,
                              );
                         }

                         if ((this as any).tankType === "round") {
                              (this as any).colorTransition(
                                   (this as any).neckFill,
                                   "fill",
                                   (this as any).fillAnimationColor,
                              );
                         }
                    }

                    colorTransition(selection, attribute, targetColor) {
                         selection
                              .transition()
                              .delay((this as any).delay)
                              .duration((this as any).transitionDuration)
                              .ease((this as any).ease)
                              .attrTween(attribute, function (d: any) {
                                   let interpolator = (window as any)?.d3.interpolateRgb(
                                        d.color,
                                        targetColor,
                                   );

                                   return function (t) {
                                        d.color = interpolator(t);
                                        return d.color;
                                   };
                              });
                    }

                    textFormatter(val) {
                         if ((this as any).fillUnit) {
                              // return `${(Number(Math.round(parseFloat(val) + 'e' + (this as any).decimal) + 'e-' + (this as any).decimal)).toFixed((this as any).decimal)} ${(this as any).fillUnit}`;
                         }
                         //   return `${(Number(Math.round(parseFloat(val) + 'e' + (this as any).decimal) + 'e-' + (this as any).decimal)).toFixed((this as any).decimal)}`;
                    }

                    lookupTextFormatter(val) {
                         if ((this as any).lookupTableValueUnit) {
                              // return `${Number(Math.round(parseFloat(val) + 'e' + (this as any).lookupTableValueDecimal) + 'e-' + (this as any).lookupTableValueDecimal).toFixed((this as any).lookupTableValueDecimal)} ${(this as any).lookupTableValueUnit}`;
                         }
                         //   return `${Number(Math.round(parseFloat(val) + 'e' + (this as any).lookupTableValueDecimal) + 'e-' + (this as any).lookupTableValueDecimal).toFixed((this as any).lookupTableValueDecimal)}`;
                    }

                    changeRateValueTextFormatter(val) {
                         if ((this as any).changeRateValueUnit) {
                              return `${Number(
                                   (Math.round(
                                        +(
                                             parseFloat(val) +
                                             "e" +
                                             (this as any).changeRateValueDecimal
                                        ),
                                   ) +
                                        "e-" +
                                        (this as any).changeRateValueDecimal) as unknown,
                              ).toFixed((this as any).changeRateValueDecimal)} ${
                                   (this as any).changeRateValueUnit
                              }`;
                         }
                         return `${Number(
                              (Math.round(
                                   +(parseFloat(val) + "e" + (this as any).changeRateValueDecimal),
                              ) +
                                   "e-" +
                                   (this as any).changeRateValueDecimal) as unknown,
                         ).toFixed((this as any).changeRateValueDecimal)}`;
                    }

                    tweenText() {
                         let that = this as any;

                         (this as any).behindText
                              .transition()
                              .delay((this as any).delay)
                              .ease((this as any).ease)
                              .duration((this as any).transitionDuration)
                              .tween("text", function (this: any) {
                                   let node = this as any;
                                   let interpolate = (window as any)?.d3.interpolate(
                                        (that as any).textFormatter(node.textContent),
                                        (that as any).textFormatter((that as any).fillValue),
                                   );

                                   return function (t) {
                                        node.textContent = (that as any).textFormatter(
                                             interpolate(t),
                                        );
                                   };
                              })
                              .attrTween("fill", function (d: any) {
                                   let interpolator = (window as any)?.d3.interpolateRgb(
                                        d.color,
                                        (that as any).backFontAnimationColor,
                                   );

                                   return function (t) {
                                        d.color = interpolator(t);
                                        return d.color;
                                   };
                              });

                         (this as any).overlayText
                              .transition()
                              .delay((this as any).delay)
                              .ease((this as any).ease)
                              .duration((this as any).transitionDuration)
                              .tween("text", function (this: any) {
                                   let node = this as any;
                                   let interpolate = (window as any)?.d3.interpolate(
                                        (that as any).textFormatter(node.textContent),
                                        (that as any).textFormatter((that as any).fillValue),
                                   );
                                   return function (t) {
                                        if ((that as any).arrow === true) {
                                             (that as any).updateArrowPosition();
                                        }
                                        node.textContent = (that as any).textFormatter(
                                             interpolate(t),
                                        );
                                   };
                              })
                              .attrTween("fill", function (d: any) {
                                   let interpolator = (window as any)?.d3.interpolateRgb(
                                        d.color,
                                        (that as any).frontFontColor,
                                   );

                                   return function (t) {
                                        d.color = interpolator(t);
                                        return d.color;
                                   };
                              })
                              .on("end", function () {
                                   if ((that as any).arrow === true) {
                                        (that as any).updateArrowPosition();
                                   }
                              });

                         if ((this as any).lookupTableValueEnabled) {
                              (this as any).lookupTableValueBehindText
                                   .transition()
                                   .delay((this as any).delay)
                                   .ease((this as any).ease)
                                   .duration((this as any).transitionDuration)
                                   .tween("text", function (this: any) {
                                        let node = this as any;
                                        let interpolate = (window as any)?.d3.interpolate(
                                             (that as any).lookupTextFormatter(node.textContent),
                                             (that as any).lookupTextFormatter(
                                                  (that as any).lookupTableValue,
                                             ),
                                        );

                                        return function (t) {
                                             node.textContent = (that as any).lookupTextFormatter(
                                                  interpolate(t),
                                             );
                                        };
                                   })
                                   .attrTween("fill", function (d: any) {
                                        let interpolator = (window as any)?.d3.interpolateRgb(
                                             d.color,
                                             (that as any).backFontAnimationColor,
                                        );

                                        return function (t) {
                                             d.color = interpolator(t);
                                             return d.color;
                                        };
                                   });

                              (this as any).lookupTableValueOverlayText
                                   .transition()
                                   .delay((this as any).delay)
                                   .ease((this as any).ease)
                                   .duration((this as any).transitionDuration)
                                   .tween("text", function (this: any) {
                                        let node = this as any;
                                        let interpolate = (window as any)?.d3.interpolate(
                                             (that as any).lookupTextFormatter(node.textContent),
                                             (that as any).lookupTextFormatter(
                                                  (that as any).lookupTableValue,
                                             ),
                                        );
                                        return function (t) {
                                             node.textContent = (that as any).lookupTextFormatter(
                                                  interpolate(t),
                                             );
                                        };
                                   })
                                   .attrTween("fill", function (d: any) {
                                        let interpolator = (window as any)?.d3.interpolateRgb(
                                             d.color,
                                             (that as any).frontFontColor,
                                        );

                                        return function (t) {
                                             d.color = interpolator(t);
                                             return d.color;
                                        };
                                   });
                         }

                         if ((this as any).changeRateValueEnabled) {
                              (this as any).changeRateValueBehindText
                                   .transition()
                                   .delay((this as any).delay)
                                   .ease((this as any).ease)
                                   .duration((this as any).transitionDuration)
                                   .tween("text", function (this: any) {
                                        let node = this as any;
                                        let interpolate = (window as any)?.d3.interpolate(
                                             (that as any).changeRateValueTextFormatter(
                                                  node.textContent,
                                             ),
                                             (that as any).changeRateValueTextFormatter(
                                                  (that as any).changeRateValue,
                                             ),
                                        );

                                        return function (t) {
                                             node.textContent = (
                                                  that as any
                                             ).changeRateValueTextFormatter(interpolate(t));
                                        };
                                   })
                                   .attrTween("fill", function (d: any) {
                                        let interpolator = (window as any)?.d3.interpolateRgb(
                                             d.color,
                                             (that as any).backFontAnimationColor,
                                        );

                                        return function (t) {
                                             d.color = interpolator(t);
                                             return d.color;
                                        };
                                   });

                              (this as any).changeRateValueOverlayText
                                   .transition()
                                   .delay((this as any).delay)
                                   .ease((this as any).ease)
                                   .duration((this as any).transitionDuration)
                                   .tween("text", function (this: any) {
                                        let node = this as any;
                                        let interpolate = (window as any)?.d3.interpolate(
                                             (that as any).changeRateValueTextFormatter(
                                                  node.textContent,
                                             ),
                                             (that as any).changeRateValueTextFormatter(
                                                  (that as any).changeRateValue,
                                             ),
                                        );
                                        return function (t) {
                                             node.textContent = (
                                                  that as any
                                             ).changeRateValueTextFormatter(interpolate(t));
                                        };
                                   })
                                   .attrTween("fill", function (d: any) {
                                        let interpolator = (window as any)?.d3.interpolateRgb(
                                             d.color,
                                             (that as any).frontFontColor,
                                        );

                                        return function (t) {
                                             d.color = interpolator(t);
                                             return d.color;
                                        };
                                   });
                         }
                    }

                    updateArrowPosition() {
                         let { xOffset, yOffset } = (this as any).calculateArrowPosition();
                         (this as any).behindArrow.attr("x", xOffset).attr("y", yOffset);
                         (this as any).overlayArrow.attr("x", xOffset).attr("y", yOffset);
                    }

                    calculateArrowPosition() {
                         let xOffset, yOffset;

                         if (
                              (this as any).changeRateValueArrowEnabled &&
                              (this as any).changeRateValueEnabled
                         ) {
                              xOffset =
                                   (this as any).changeRateValueOverlayText.node().getBBox().width /
                                        2 +
                                   (this as any).overlayArrow.node().getBBox().width / 2 +
                                   (this as any).arrowXOffset;
                              yOffset =
                                   (this as any).fontSize / 4 +
                                   (this as any).changeRateValueFontSize +
                                   (this as any).changeRateValueYOffset -
                                   1;

                              if ((this as any).lookupTableValueEnabled) {
                                   yOffset +=
                                        (this as any).lookupTableValueFontSize +
                                        (this as any).lookupTableValueYOffset;
                              }
                         } else {
                              xOffset =
                                   (this as any).overlayText.node().getBBox().width / 2 +
                                   (this as any).overlayArrow.node().getBBox().width +
                                   (this as any).arrowXOffset;
                              yOffset =
                                   (this as any).overlayArrow.node().getBBox().height / 4 +
                                   (this as any).arrowYOffset;
                         }

                         return { xOffset: xOffset, yOffset: yOffset };
                    }

                    repositionElements() {
                         (this as any).repositionMarker();
                         (this as any).setSupportLabelText((this as any).supportLabelText);
                    }

                    // calculate the needed transformation values for positioning the markers
                    repositionMarker() {
                         let topMarkerLabelTrans = `translate(${
                              (this as any).innerWidth / 2 +
                              (this as any).markerLabelXOffset -
                              (this as any).markerFontSize / 4
                         }, -${
                              (this as any).innerHeight / 2 -
                              (this as any).markerFontSize +
                              (this as any).markerLabelYOffset
                         })`;
                         let bottomMarkerLabelTrans = `translate(${
                              (this as any).innerWidth / 2 +
                              (this as any).markerLabelXOffset -
                              (this as any).markerFontSize / 4
                         }, ${
                              (this as any).innerHeight / 2 -
                              (this as any).markerFontSize / 4 +
                              (this as any).markerLabelYOffset
                         })`;

                         (this as any).topMarkerLabel.attr("transform", topMarkerLabelTrans);
                         (this as any).bottomMarkerLabel.attr("transform", bottomMarkerLabelTrans);

                         if ((this as any).tankType === "round") {
                              let markerBarGroupTrans = `translate(${
                                   (this as any).innerWidth / 2 +
                                   (this as any).markerLength +
                                   (this as any).markerBarXOffset
                              }, 0)`;

                              (this as any).markerBarGroup.attr("transform", markerBarGroupTrans);
                         } else if ((this as any).tankType === "tower") {
                              let markerBarGroupTrans = `translate(${
                                   (this as any).innerWidth / 2
                              }, 0)`;

                              (this as any).markerBarGroup.attr("transform", markerBarGroupTrans);
                         }
                    }

                    repositionSupportLabelGroup() {
                         (this as any).repositionSupportLabelBg();
                         (this as any).repositionSupportLabel();

                         (this as any).supportLabelGroup.attr(
                              "transform",
                              `translate(0, ${
                                   (this as any).height / 2 -
                                   (this as any).borderWidth -
                                   (this as any).supportLabelBgHeight / 2
                              })`,
                         );
                    }

                    repositionSupportLabelBg() {
                         let paddingForAesthetic = 1.6 * (this as any).supportLabelPadding;
                         let { width, height } = (this as any).getSupportLabelDimensions();
                         let requiredWidth =
                              width + 2 * (this as any).supportLabelPadding + paddingForAesthetic;
                         let requiredHeight = height + 2 * (this as any).supportLabelPadding;
                         (this as any).supportLabelBgWidth = requiredWidth;
                         (this as any).supportLabelBgHeight = requiredHeight;

                         (this as any).supportLabelBg
                              .attr("width", (this as any).supportLabelBgWidth)
                              .attr("height", (this as any).supportLabelBgHeight)
                              .attr(
                                   "transform",
                                   `translate(-${(this as any).supportLabelBgWidth / 2}, -${
                                        (this as any).supportLabelBgHeight / 2
                                   })`,
                              );
                    }

                    repositionSupportLabel() {
                         if ((this as any).dualSupportLabel === true) {
                              (this as any).topSupportLabelTrans = `translate(0, ${
                                   (this as any).supportLabelYOffset +
                                   (this as any).topSupportLabelYOffset
                              })`;
                              (this as any).supportLabelTrans = `translate(0, ${
                                   (this as any).supportLabelFontSize +
                                   (this as any).supportLabelYOffset
                              })`;
                         } else if ((this as any).dualSupportLabel === false) {
                              (this as any).supportLabelTrans = `translate(0, ${
                                   (this as any).supportLabelFontSize / 2 +
                                   (this as any).supportLabelYOffset
                              })`;
                         }
                         (this as any).topSupportLabel.attr(
                              "transform",
                              (this as any).topSupportLabelTrans,
                         );
                         (this as any).supportLabel.attr(
                              "transform",
                              (this as any).supportLabelTrans,
                         );
                    }

                    applyAttributes(selection, datum = {}) {
                         let properties = Object.getOwnPropertyNames(datum);
                         properties.forEach((p) => {
                              if (p === "datum") {
                                   return selection.datum(datum[p]);
                              } else if (p === "text") {
                                   return selection.text(datum[p]);
                              } else if (p === "style") {
                                   return selection.style(datum[p]);
                              } else {
                                   return selection.attr(p, datum[p]);
                              }
                         });
                    }

                    getSupportLabelDimensions() {
                         let width, height;
                         if ((this as any).dualSupportLabel === true) {
                              width = (this as any).getMaxWidth(
                                   (this as any).supportLabel,
                                   (this as any).topSupportLabel,
                              );
                              height =
                                   (this as any).supportLabelFontSize -
                                   (this as any).supportLabelYOffset +
                                   (this as any).topSupportLabelFontSize -
                                   (this as any).topSupportLabelYOffset;
                         } else if ((this as any).dualSupportLabel === false) {
                              width = (this as any).supportLabel.node().getBBox().width;
                              height =
                                   (this as any).supportLabelFontSize -
                                   (this as any).supportLabelYOffset;
                         }

                         return { width: width, height: height };
                    }

                    getHeight(selection: any) {
                         return selection.node().getBBox().height;
                    }

                    getMaxWidth(first: any, second: any) {
                         if (typeof second === "object") {
                              return Math.max(
                                   first.node().getBBox().width,
                                   second.node().getBBox().width,
                              );
                         }
                         return first.node().getBBox().width;
                    }

                    getXCoordOfEllipse(y: any) {
                         return Math.sqrt(
                              Math.pow((this as any).tankRx, 2) *
                                   (1 - Math.pow(y, 2) / Math.pow((this as any).tankRy, 2)),
                         );
                    }

                    getYCoordOfEllipse(x: any) {
                         return Math.sqrt(
                              Math.pow((this as any).tankRy, 2) *
                                   (1 - Math.pow(x, 2) / Math.pow((this as any).tankRx, 2)),
                         );
                    }

                    slopeOfLineTangentToEllipse(x: any, y: any) {
                         return (
                              (-x * Math.pow((this as any).tankRy, 2)) /
                              (y * Math.pow((this as any).tankRx, 2))
                         );
                    }

                    setDecimal(val) {
                         (this as any).decimal = val;
                         (this as any).tweenText();
                    }

                    updateHeight(val) {
                         (this as any).animateNewHeight(val);
                    }

                    updateLookupTableValue(val) {
                         (this as any).lookupTableValue = val;
                    }

                    updateChangeRateValue(val: any) {
                         (this as any).changeRateValue = val;
                    }

                    setMarkerText(top: any, bottom: any) {
                         if ((this as any).marker === true) {
                              (this as any).topMarkerLabel.text(top);
                              (this as any).bottomMarkerLabel.text(bottom);
                         } else {
                              console.log("markers are not enabled.");
                         }
                         (this as any).repositionMarker();
                    }

                    setSupportLabelText(...args: any[]) {
                         if ((this as any).enableSupportLabel === true) {
                              if (args.length === 1) {
                                   (this as any).dualSupportLabel = false;
                                   (this as any).topSupportLabel.attr("fill-opacity", 0);
                                   (this as any).supportLabel.text(args[0]);
                              } else if (args.length === 2) {
                                   (this as any).dualSupportLabel = true;
                                   (this as any).topSupportLabel.attr("fill-opacity", 1);
                                   (this as any).supportLabel.text(args[1]);
                                   (this as any).topSupportLabel.text(args[0]);
                              }
                         }

                         //resize and reposition support label elements
                         (this as any).repositionSupportLabelGroup();
                    }

                    updateFillColor(options) {
                         if (typeof options === "object") {
                              if ("fillColor" in options) {
                                   (this as any).fillColor = options.fillColor;
                              }
                              if ("overlayTextFillOpacity" in options) {
                                   (this as any).overlayTextFillOpacity =
                                        options.overlayTextFillOpacity;
                              }
                              if ("topFillColor" in options) {
                                   (this as any).topFillColor = options.topFillColor;
                              }
                              if ("topFillBackFontColor" in options) {
                                   (this as any).topFillBackFontColor =
                                        options.topFillBackFontColor;
                              }
                              if ("bottomFillColor" in options) {
                                   (this as any).bottomFillColor = options.bottomFillColor;
                              }
                              if ("bottomFillBackFontColor" in options) {
                                   (this as any).bottomFillBackFontColor =
                                        options.bottomFillBackFontColor;
                              }
                              if ("backFontColor" in options) {
                                   (this as any).backFontColor = options.backFontColor;
                              }
                              if ("frontFontColor" in options) {
                                   (this as any).frontFontColor = options.frontFontColor;
                              }
                              if ("topFillBackArrowColor" in options) {
                                   (this as any).topFillBackArrowColor =
                                        options.topFillBackArrowColor;
                              }
                              if ("bottomFillBackArrowColor" in options) {
                                   (this as any).bottomFillBackArrowColor =
                                        options.bottomFillBackArrowColor;
                              }
                              if ("frontArrowColor" in options) {
                                   (this as any).frontArrowColor = options.frontArrowColor;
                              }
                              if ("backArrowColor" in options) {
                                   (this as any).backArrowColor = options.backArrowColor;
                              }
                              (this as any).tweenElements();
                         }
                    }

                    updateColor(color: any) {
                         (this as any).fillColor = color;
                         (this as any).backFontColor = color;
                         (this as any).backArrowColor = color;
                         (this as any).tweenElements();
                    }

                    updateArrow(options: any) {
                         if ("destroy" in options) {
                              if (options.destroy === true) {
                                   (this as any).removeArrow();
                              }
                         } else if ("enable" in options) {
                              (this as any).arrow = true;
                              (this as any).addArrow();
                         }
                         if (
                              typeof (this as any).behindArrow !== "undefined" &&
                              typeof (this as any).overlayArrow !== "undefined"
                         ) {
                              if ("topFillBackArrowColor" in options) {
                                   (this as any).topFillBackArrowColor =
                                        options.topFillBackArrowColor;
                              }
                              if ("bottomFillBackArrowColor" in options) {
                                   (this as any).bottomFillBackArrowColor =
                                        options.bottomFillBackArrowColor;
                              }
                              if ("frontArrowColor" in options) {
                                   (this as any).frontArrowColor = options.frontArrowColor;
                              }
                              if ("backArrowColor" in options) {
                                   (this as any).backArrowColor = options.backArrowColor;
                              }
                              if ("direction" in options) {
                                   let direction = options.direction;
                                   if (direction === "up") {
                                        (this as any).arrowName = (this as any).upArrowName;
                                   } else if (direction === "down") {
                                        (this as any).arrowName = (this as any).downArrowName;
                                   } else if (direction === "none") {
                                        (this as any).arrowName = (this as any).noArrowName;
                                   }
                                   (this as any).behindArrow.text((this as any).arrowName);
                                   (this as any).overlayArrow.text((this as any).arrowName);
                              }
                              if ("changeRateValueArrowEnabled" in options) {
                                   (this as any).changeRateValueArrowEnabled =
                                        options.changeRateValueArrowEnabled;
                              }

                              (this as any).tweenElements();
                              (this as any).updateArrowPosition();
                         }
                    }

                    addArrow() {
                         (this as any).behindArrow.attr("fill-opacity", 1);
                         (this as any).overlayArrow.attr("fill-opacity", 1);
                    }

                    removeArrow() {
                         (this as any).behindArrow.attr("fill-opacity", 0);
                         (this as any).overlayArrow.attr("fill-opacity", 0);
                         (this as any).arrow = false;
                    }

                    redraw() {
                         (this as any).destroy();
                         (this as any).init();
                    }

                    destroy() {
                         (this as any).tankWidth = null;
                         (this as any).tankHeight = null;
                         (this as any).viewPortWidth = null;
                         (this as any).viewPortHeight = null;
                         (this as any).topMarkerText = null;
                         (this as any).bottomMarkerText = null;
                         (this as any).svgContainer.remove();
                    }

                    click(callback: () => void) {
                         if (typeof callback !== "function") {
                              throw new Error("argument must be a function");
                         }
                         (this as any).svgContainer.on("click", callback);
                    }

                    setBisector() {
                         (this as any).bisector = (window as any)?.d3.bisector(function (d: any) {
                              return d.yCoord;
                         }).left;
                    }

                    transitionMarker(marker: any, targetWidth: any, targetX1: any) {
                         marker
                              .transition()
                              .duration(200)
                              .ease((window as any)?.d3.easeLinear)
                              .attrTween("stroke-width", function (d: any) {
                                   let interpolator = (window as any)?.d3.interpolateNumber(
                                        d.strokeWidth,
                                        targetWidth,
                                   );

                                   return function (t) {
                                        d.strokeWidth = interpolator(t);
                                        return d.strokeWidth;
                                   };
                              })
                              .attrTween("x1", function (d: any) {
                                   let interpolator = (window as any)?.d3.interpolateNumber(
                                        d.x1,
                                        targetX1,
                                   );

                                   return function (t) {
                                        d.x1 = interpolator(t);
                                        return d.x1;
                                   };
                              });
                    }

                    hover() {
                         ((window as any)?.d3 as any)
                              .select((this as any).svgContainer.node().parentNode)
                              .on("mouseleave", function (this: any) {
                                   (this as any).thresholdMarkers.forEach((marker, i) => {
                                        (this as any).transitionMarker(
                                             marker,
                                             (this as any).markerWidth,
                                             -(this as any).markerLength,
                                        );
                                        (this as any).thresholdTooltips[i].style("display", "none");
                                   });
                              });

                         ((window as any)?.d3)
                              .select((this as any).svgContainer.node().parentNode)
                              .on("mousemove", function (this: any) {
                                   let yCoord = (window as any)?.d3.mouse(
                                        (this as any).markerBarGroup.node(),
                                   )[1];
                                   let locationIndex = (this as any).bisector(
                                        (this as any).thresholdMarkerPositions,
                                        yCoord,
                                   );

                                   if (locationIndex >= 0) {
                                        (this as any).thresholdMarkers.forEach((marker, i) => {
                                             if (i === locationIndex) {
                                                  (this as any).transitionMarker(
                                                       marker,
                                                       (this as any).markerWidth + 3,
                                                       -((this as any).markerLength + 3),
                                                  );
                                                  (this as any).thresholdTooltips[i].style(
                                                       "display",
                                                       "initial",
                                                  );
                                             } else {
                                                  (this as any).transitionMarker(
                                                       marker,
                                                       (this as any).markerWidth,
                                                       -(this as any).markerLength,
                                                  );
                                                  (this as any).thresholdTooltips[i].style(
                                                       "display",
                                                       "none",
                                                  );
                                             }
                                        });
                                   } else {
                                        (this as any).transitionMarker(
                                             (this as any).thresholdMarkers[0],
                                             (this as any).markerWidth + 3,
                                             -((this as any).markerLength + 3),
                                        );
                                        (this as any).thresholdTooltips[0].style(
                                             "display",
                                             "initial",
                                        );
                                   }
                              });
                    }

                    // utility functions
                    uniqId() {
                         // Convert it to base 36 (numbers + letters), and grab the first 9 characters
                         // after the decimal.
                         return "clipPath" + Math.random().toString(36).substr(2, 9);
                    }
                    getUniqUrl(id) {
                         return `url(${(this as any).url}#${id})`;
                    }

                    insertFirstBeforeSecond(container, first: any, second: any) {
                         return container.insert(
                              function () {
                                   return first.node();
                              },
                              function () {
                                   return second.node();
                              },
                         );
                    }

                    insertFirstAfterSecond(container, first: any, second: any) {
                         container.insert(
                              function () {
                                   return first.node();
                              },
                              function () {
                                   return second.node();
                              },
                         );

                         return container.insert(
                              function () {
                                   return second.node();
                              },
                              function () {
                                   return first.node();
                              },
                         );
                    }

                    appendSecondElementToFirst(first: any, ...args: any[]) {
                         args.forEach((arg) => first.append(() => arg.node())); // for each second argument, return a function: first.append( function(arg) { arg.node() });
                    }
               } // end of class
          })((window as any)?.jQuery);

          let thresholds = [
               {
                    name: "Alarm High",
                    value: 90,
                    type: "High",
                    alarm: true,
               },
               {
                    name: "Pump On",
                    value: 55,
                    type: "High",
                    alarm: false,
               },
               {
                    name: "Pump On",
                    value: 40,
                    type: "Low",
                    alarm: false,
               },
               {
                    name: "Alarm Low",
                    value: 10,
                    type: "Low",
                    alarm: true,
               },
          ];

          let options = {
               tankType: "tower",
               fillValue: fillValue,
               fillUnit: "ft",
               supportLabelPadding: 5,
               frontFontColor: "#003B42",
               thresholds: thresholds,
               lookupTableValue: 1700,
               lookupTableValueUnit: "kG",
               lookupTableValueDecimal: 1,
               changeRateValueDecimal: 0,
               changeRateValueArrowEnabled: true,
               changeRateValue: fillValue,
               marker: false,
               changeRateValueUnit: "kG",
          };
          // $("." + classN).html();
          let tank = $("." + classN).analogTank(options);
          tank.setSupportLabelText("Formula: 100121");
          tankRef.current = tank;
          let that = this as any;

          let randomColor = ["#C62828", "#BA68C8", "#1976D2", "#FFB74D", "#607D8B"];
          function getRandomColor() {
               return randomColor[Math.floor(Math.random() * 5)];
          }
          function getNow() {
               return Date().slice(16, 24);
          }

          function getRandom() {
               return Math.floor(Math.random() * 100);
          }
          tank.click(function () {
               //   var randomVal = getRandom();
               // tank.updateHeight(3000);
          });

          function setOneText() {
               tank.setSupportLabelText(getNow());
          }
          function setTwoText() {
               tank.setSupportLabelText(getNow(), "bottom label");
          }
          function fillColor() {
               tank.updateColor(getRandomColor());
          }
          function backFontColor() {
               tank.updateFillColor({ backFontColor: getRandomColor() });
          }
          function frontFontColor() {
               tank.updateFillColor({ frontFontColor: getRandomColor() });
          }
          function topFillBackFontColor() {
               tank.updateFillColor({ topFillBackFontColor: getRandomColor() });
          }
          function bottomFillBackFontColor() {
               tank.updateFillColor({ bottomFillBackFontColor: getRandomColor() });
          }
          function topFillColor() {
               tank.updateFillColor({ topFillColor: getRandomColor() });
          }
          function bottomFillColor() {
               tank.updateFillColor({ bottomFillColor: getRandomColor() });
          }

          function shrink() {
               document
                    .getElementsByClassName(classN)[0]
                    .setAttribute("style", "width:200px;height:200px;");
               tank.redraw();
          }
          function enlarge() {
               document
                    .getElementsByClassName(classN)[0]
                    .setAttribute("style", "width:400px;height:400px;");
               tank.redraw();
          }
          function high() {
               tank.updateHeight(100);
          }
          function mid() {
               tank.updateHeight(55);
          }
          function low() {
               tank.updateHeight(0);
          }
          function addArrow() {
               tank.updateArrow({ enable: true });
          }
          function removeArrow() {
               tank.updateArrow({ destroy: true });
          }
          function upArrow() {
               tank.updateArrow({ direction: "up" });
          }
          function downArrow() {
               tank.updateArrow({ direction: "down" });
          }
          function defaultArrow() {
               tank.updateArrow({ direction: "none" });
          }
          function topFillArrowColor() {
               tank.updateArrow({ topFillBackArrowColor: getRandomColor() });
          }
          function bottomFillBackArrowColor() {
               tank.updateArrow({ bottomFillBackArrowColor: getRandomColor() });
          }
          function frontArrowColor() {
               tank.updateArrow({ frontArrowColor: getRandomColor() });
          }
          function backArrowColor() {
               tank.updateArrow({ backArrowColor: getRandomColor() });
          }
          function setDecimalZero() {
               tank.setDecimal(0);
          }
          function setDecimalOne() {
               tank.setDecimal(1);
          }
          function setDecimalTwo() {
               tank.setDecimal(2);
          }
          function tower() {
               tank.tankType = "tower";
               delete tank.topMarkerFontColor;
               delete tank.bottomMarkerFontColor;
               tank.redraw();
          }
          function round() {
               tank.tankType = "round";
               tank.topMarkerFontColor = "#fafafa";
               tank.bottomMarkerFontColor = "#fafafa";
               tank.redraw();
          }
          function destroy() {
               tank.destroy();
          }
          function updateLookupTableValue() {
               tank.updateLookupTableValue(`${Math.random() * 1000}`);
          }
     }, []);

     useEffect(() => {
          if (tankRef?.current) {
               tankRef?.current.updateHeight(fillValue);
               tankRef?.current.updateChangeRateValue(fillValue);
          }
     }, [fillValue]);

     const isTemperatureLow = () => {
          if (temperature && minimumTemperature) {
               if (temperature < +minimumTemperature) {
                    return true;
               }
          }
          return false;
     };

     const handleBatchSearch = (batchNumber) => {
          setLoading(true);
          getBatch(
               +batchNumber,
               () => {
                    toggleBatchViewModal();
                    setLoading(false);
               },
               () => {
                    setLoading(false);
               },
               setBatch,
          );
     };

     return (
          <div className={`text-center ${classes.root}`} style={style ? style : {}}>
               <div id="empty-space"></div>
               <h4>{title}</h4>

               <p>Size: {fillMaxValue}</p>
               <div className={`tester ${classes.tester}`} ref={containerRef}>
                    <div id="wrapper" className={`${classN}`}></div>
               </div>

               <div className="d-flex align-items-center justify-content-center gap-1  mt-1">
                    <div className="row">
                         <label
                              htmlFor="colFormLabelSm"
                              className="col-sm-4 col-form-label col-form-label-sm pull-right"
                         >
                              <small>Batch#</small>
                         </label>
                         <div className="col-sm-8">
                              <input
                                   type="text"
                                   value={batchNumber}
                                   className="form-control form-control-sm"
                                   id="colFormLabelSm"
                                   placeholder="col-form-label-sm"
                              />
                         </div>
                    </div>
                      <button
                         className="btn btn-default"
                         onClick={() => handleBatchSearch(batchNumber)}
                         disabled={loading}
                    >
                         {!loading ? (
                              <img src={image} height={20} width={20} />
                         ) : (
                              <Spinner color="info" size={15} style={{ width: 20, height: 20 }} />
                         )}
                    </button>
               </div>
               <div className={classes.tempText}>
                    <span>{temperature}</span>
                    <span>{temperatureMsm}</span>
               </div>
               {type !== "normal" && isTemperatureLow() && (
                    <div className={classes.temperature}>
                         Temperature is Low <AiFillWarning />{" "}
                    </div>
               )}
          </div>
     );
};

export default Tank;
