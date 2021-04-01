import { createGlobalStyle } from 'styled-components';
import {
  ROBOTO_BLACK_TTF,
  ROBOTO_BOLD_ITALIC_TTF,
} from './styles/fonts/Roboto';

import injectFontFaces from './styles/injectFontFaces';
const getFormattedURL = (name, format) => `url(${name}) format(${format})`;
const utilityClasses = `
/**
* display utility class
*/
.u-d-block{
 display: block;
}
.u-d-flex{
 display: flex;
}
.u-d-inline{
 display: inline;
}
.u-d-inline-block{
 display: inline-block;
}
.u-d-inline-flex{
 display: inline-flex;
}
.u-d-none{
 display: none;
}
.u-d-table{
 display: table;
}
.u-d-table-cell{
 display: table-cell;
}

/**
* Utility classes for flex-box 
*/
.u-flex-column {
 flex-direction: column;
}
.u-flex-column-reverse {
 flex-direction: column-reverse;
}
.u-flex-row {
 flex-direction: row;
}
.u-flex-row-reverse {
 flex-direction: row-reverse;
}
.u-flex-nowrap {
 flex-wrap: nowrap;
}
.u-flex-wrap {
 flex-wrap: wrap;
}
.u-flex-wrap-reverse {
 flex-wrap: wrap-reverse;
}
.u-flex-fill {
 flex: 1 1 auto;
}
.u-flex-grow-1 {
 flex-grow: 1;
}
.u-flex-grow-0 {
 flex-grow: 0;
}
.u-flex-shrink-1 {
 flex-grow: 1;
}
.u-flex-shrink-0 {
 flex-grow: 0;
}
.u-justify-content-start {
 justify-content: flex-start;
}
.u-justify-content-end {
 justify-content: flex-end;
}
.u-justify-content-center {
 justify-content: center;
}
.u-justify-content-between {
 justify-content: space-between;
}
.u-justify-content-around {
 justify-content: space-around;
}
.u-align-content-start {
 align-content: flex-start;
}
.u-align-content-end {
 align-content: flex-end;
}
.u-align-content-stretch {
 align-content: stretch;
}
.u-align-content-center {
 align-content: center;
}
.u-align-content-around {
 align-content: space-around;
}
.u-align-items-start {
 align-items: flex-start;
}
.u-align-items-end {
 align-items: flex-end;
}
.u-align-items-baseline {
 align-items: baseline;
}
.u-align-items-center {
 align-items: center;
}
.u-align-items-stretch {
 align-items: stretch;
}
.u-align-self-start {
 align-self: flex-start;
}
.u-align-self-end {
 align-self: flex-end;
}
.u-align-self-center {
 align-self: center;
}
.u-align-self-stretch {
 align-self: stretch;
}
.u-align-self-baseline {
 align-self: baseline;
}
/*
* spacing utility class
*/
// margin 
.u-m-1{
 margin: @margin-xss;
}
.u-m-2{
 margin: @margin-xs;
}
.u-m-3{
 margin: @margin-sm;
}
.u-m-4{
 margin: @margin-md;
}
.u-m-5{
 margin: @margin-lg;
}
// margin top
.u-mt-1{
 margin-top: @margin-xss;
}
.u-mt-2{
 margin-top: @margin-xs;
}
.u-mt-3{
 margin-top: @margin-sm;
}
.u-mt-4{
 margin-top: @margin-md;
}
.u-mt-5{
 margin-top: @margin-lg;
}
// margin negative top
.u-mt-n1{
 margin-top: -@margin-xss;
}
.u-mt-n2{
 margin-top: -@margin-xs;
}
.u-mt-n3{
 margin-top: -@margin-sm;
}
.u-mt-n4{
 margin-top: -@margin-md;
}
.u-mt-n5{
 margin-top: -@margin-lg;
}
// margin bottom
.u-mb-1{
 margin-bottom: @margin-xss;
}
.u-mb-2{
 margin-bottom: @margin-xs;
}
.u-mb-3{
 margin-bottom: @margin-sm;
}
.u-mb-4{
 margin-bottom: @margin-md;
}
.u-mb-5{
 margin-bottom: @margin-lg;
}
// margin negative bottom
.u-mb-n1{
 margin-bottom: -@margin-xss;
}
.u-mb-n2{
 margin-bottom: -@margin-xs;
}
.u-mb-n3{
 margin-bottom: -@margin-sm;
}
.u-mb-n4{
 margin-bottom: -@margin-md;
}
.u-mb-n5{
 margin-bottom: -@margin-lg;
}
// margin right
.u-mr-1{
 margin-right: @margin-xss;
}
.u-mr-2{
 margin-right: @margin-xs;
}
.u-mr-3{
 margin-right: @margin-sm;
}
.u-mr-4{
 margin-right: @margin-md;
}
.u-mr-5{
 margin-right: @margin-lg;
}
// margin negative right
.u-mr-n1{
 margin-right: -@margin-xss;
}
.u-mr-n2{
 margin-right: -@margin-xs;
}
.u-mr-n3{
 margin-right: -@margin-sm;
}
.u-mr-n4{
 margin-right: -@margin-md;
}
.u-mr-n5{
 margin-right: -@margin-lg;
}
// margin left
.u-ml-1{
 margin-left: @margin-xss;
}
.u-ml-2{
 margin-left: @margin-xs;
}
.u-ml-3{
 margin-left: @margin-sm;
}
.u-ml-4{
 margin-left: @margin-md;
}
.u-ml-5{
 margin-left: @margin-lg;
}
// margin negative left
.u-ml-n1{
 margin-left: -@margin-xss;
}
.u-ml-n2{
 margin-left: -@margin-xs;
}
.u-ml-n3{
 margin-left: -@margin-sm;
}
.u-ml-n4{
 margin-left: -@margin-md;
}
.u-ml-n5{
 margin-left: -@margin-lg;
}
// padding
.u-p-1{
 padding: @padding-xss;
}
.u-p-2{
 padding: @padding-xs;
}
.u-p-3{
 padding: @padding-sm;
}
.u-p-4{
 padding: @padding-md;
}
.u-p-5{
 padding: @padding-lg;
}
// padding top
.u-pt-1{
 padding-top: @padding-xss;
}
.u-pt-2{
 padding-top: @padding-xs;
}
.u-pt-3{
 padding-top: @padding-sm;
}
.u-pt-4{
 padding-top: @padding-md;
}
.u-pt-5{
 padding-top: @padding-lg;
}
// padding bottom
.u-pb-1{
 padding-bottom: @padding-xss;
}
.u-pb-2{
 padding-bottom: @padding-xs;
}
.u-pb-3{
 padding-bottom: @padding-sm;
}
.u-pb-4{
 padding-bottom: @padding-md;
}
.u-pb-5{
 padding-bottom: @padding-lg;
}
// padding right
.u-pr-1{
 padding-right: @padding-xss;
}
.u-pr-2{
 padding-right: @padding-xs;
}
.u-pr-3{
 padding-right: @padding-sm;
}
.u-pr-4{
 padding-right: @padding-md;
}
.u-pr-5{
 padding-right: @padding-lg;
}
// padding left
.u-pl-1{
 padding-left: @padding-xss;
}
.u-pl-2{
 padding-left: @padding-xs;
}
.u-pl-3{
 padding-left: @padding-sm;
}
.u-pl-4{
 padding-left: @padding-md;
}
.u-pl-5{
 padding-left: @padding-lg;
}
/*
* sizing utility class
*/
// width
.u-w-25 {
 width: 25%;
}
.u-w-50 {
 width: 50%;
}
.u-w-75 {
 width: 75%;
}
.u-w-100 {
 width: 100%;
}
.u-mw-100 {
 max-width: 100%;
}
// height
.u-h-25 {
 height: 25%;
}
.u-h-50 {
 height: 50%;
}
.u-h-75 {
 height: 75%;
}
.u-h-100 {
 height: 100%;
}
.u-mh-100 {
 max-height: 100%;
}

/*
* colors utility class
*/

//background
.u-bg-primary {
 background-color: @primary-color;
}
.u-bg-secondary {
 background-color: @secondary-color;
}
.u-bg-success {
 background-color: @success-color;
}
.u-bg-info {
 background-color: @processing-color;
}
.u-bg-warning {
 background-color: @warning-color;
}
.u-bg-danger {
 background-color: @error-color;
}
.u-bg-light {
 background-color: @background-color-light ;
}
.u-bg-dark {
 background-color: @black;
}
.u-bg-white {
 background-color: @white;
}

//text
.u-text-primary {
 color: @text-color;
}
.u-text-secondary {
 color: @text-color-primary;
}
.u-text-success {
 color: @success-color;
}
.u-text-info {
 color: @processing-color;
}
.u-text-warning {
 color: @warning-color;
}
.u-text-danger {
 color: @error-color;
}
.u-text-light {
 color: @background-color-light ;
}
.u-text-dark {
 color: @text-color-dark;
}
.u-text-white {
 color: @text-color-inverse;
}
/*
* Text utility class
*/

// font-weight
.u-font-weight-bold {
 font-weight: bold;
} 
.u-font-weight-bolder {
 font-weight: bolder;
} 
.u-font-weight-light {
 font-weight: light;
} 
.u-font-weight-lighter {
 font-weight: lighter;
} 
.u-font-weight-normal {
 font-weight: normal;
} 

// text-decoration
.u-text-decoration-none {
 text-decoration: none; 
}
// font-style
.u-font-style-italic {
 font-style: italic;
}
.u-font-size-base {
  font-size : @font-size-base;
}
.u-font-size-sm {
  font-size : @font-size-sm;
}
.u-font-size-lg {
  font-size : @font-size-lg;
}
// text-monospace 
.u-text-monospace {
   font-family: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace !important;
}
// text style
.u-text-justify {
 text-align: justify !important;
}
.u-text-center {
 text-align: center !important;
}
.u-text-nowrap {
 white-space: nowrap !important;
}
.u-text-right {
 text-align: right !important;
}
.u-text-lowercase {
 text-transform: lowercase !important;
}
.u-text-uppercase {
 text-transform: uppercase !important;
}
.u-text-capitalize {
 text-transform: capitalize !important;
}
.u-text-truncate {
 overflow: hidden;
 text-overflow: ellipsis;
 white-space: nowrap;
}
.u-text-muted {
 color: #6c757d !important;
}
.u-text-break {
 word-break: break-word !important;
 overflow-wrap: break-word !important;
}`;
const GlobalStyle = createGlobalStyle`
  ${injectFontFaces('Roboto', [
    getFormattedURL(ROBOTO_BLACK_TTF, 'ttf'),
    getFormattedURL(ROBOTO_BOLD_ITALIC_TTF, 'ttf'),
  ])}
  body {
    height: 100%;
    width: 100%;
  }
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
  ${utilityClasses};
`;

export default GlobalStyle;
