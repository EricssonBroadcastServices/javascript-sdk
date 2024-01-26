// This file is licensed under the MIT License

// Copyright (c) 2019 Ihor Diachenko

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// https://github.com/ihordiachenko/supports-webp-sync
function internalIsWebPSupported() {
  if (typeof window !== "undefined" && window.document && window.navigator) {
    // Check FF, Edge by user agent
    const match = window.navigator.userAgent.match(/(Edge|Firefox)\/(\d+)\./);
    if (match) {
      return (match[1] === "Firefox" && +match[2] >= 65) || (match[1] === "Edge" && +match[2] >= 18);
    }

    // Use canvas hack for webkit-based browsers
    // Kudos to Rui Marques: https://stackoverflow.com/a/27232658/7897049
    const e = window.document.createElement("canvas");
    return e.toDataURL?.("image/webp")?.indexOf("data:image/webp") === 0;
  }
  return false;
}

const isSupported = internalIsWebPSupported();
export function isWebPSupported() {
  return isSupported;
}
