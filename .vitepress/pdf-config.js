/* courtesy of for mermaid integration
  - https://gist.github.com/danishcake/d045c867594d6be175cb394995c90e2c
  - https://github.com/MichielDeMey/marked-mermaid
  - https://www.npmjs.com/package/@maddyguthridge/marked-mermaid
  - https://dev.to/bmf_san/convert-markdown-format-files-to-pdf-files-mermaidemojitoc-compatible-5ekh*/
const renderer = {
    code(code, infostring) {
        if (infostring === 'mermaid') {
            return `<pre class="mermaid">${code}</pre>`
        }
        return false
    },
};

module.exports = {
    marked_extensions: [{ renderer }],
    script: [
        { url: 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js' },
        { content: 'mermaid.initialize({ startOnLoad: false}); (async () => { await mermaid.run(); })();' }
    ],
    pdf_options: {
        headerTemplate: "<div style='width:297mm;font-size:9px;font-style:italic;display:flex;justify-content: space-between;'>" +
            "<span style='margin-left:1cm'>ETML</span> " +
            "<span><span class='title'></span></span> " +
            "<span style='margin-right:1cm'></span>" +
            "</div>",
        footerTemplate: "<div style='width:297mm;font-size:9px;font-style:italic;display:flex;justify-content: space-between;'>" +
            "<span style='margin-left:1cm'>Auteur: Jonathan Melly</span> " +
            "<span>Page <span class='pageNumber'></span> / <span class='totalPages'></span></span> " +
            "<span style='margin-right:1cm'>Version du <span class='date'></span></span>" +
            "</div>"
    }
};
