(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0aab07"],{"11a2":function(e,n,t){"use strict";t.r(n),t.d(n,"conf",(function(){return r})),t.d(n,"language",(function(){return o}));var r={comments:{lineComment:"#"},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],folding:{offSide:!0}},o={tokenPostfix:".yaml",brackets:[{token:"delimiter.bracket",open:"{",close:"}"},{token:"delimiter.square",open:"[",close:"]"}],keywords:["true","True","TRUE","false","False","FALSE","null","Null","Null","~"],numberInteger:/(?:0|[+-]?[0-9]+)/,numberFloat:/(?:0|[+-]?[0-9]+)(?:\.[0-9]+)?(?:e[-+][1-9][0-9]*)?/,numberOctal:/0o[0-7]+/,numberHex:/0x[0-9a-fA-F]+/,numberInfinity:/[+-]?\.(?:inf|Inf|INF)/,numberNaN:/\.(?:nan|Nan|NAN)/,numberDate:/\d{4}-\d\d-\d\d([Tt ]\d\d:\d\d:\d\d(\.\d+)?(( ?[+-]\d\d?(:\d\d)?)|Z)?)?/,escapes:/\\(?:[btnfr\\"']|[0-7][0-7]?|[0-3][0-7]{2})/,tokenizer:{root:[{include:"@whitespace"},{include:"@comment"},[/%[^ ]+.*$/,"meta.directive"],[/---/,"operators.directivesEnd"],[/\.{3}/,"operators.documentEnd"],[/[-?:](?= )/,"operators"],{include:"@anchor"},{include:"@tagHandle"},{include:"@flowCollections"},{include:"@blockStyle"},[/@numberInteger(?![ \t]*\S+)/,"number"],[/@numberFloat(?![ \t]*\S+)/,"number.float"],[/@numberOctal(?![ \t]*\S+)/,"number.octal"],[/@numberHex(?![ \t]*\S+)/,"number.hex"],[/@numberInfinity(?![ \t]*\S+)/,"number.infinity"],[/@numberNaN(?![ \t]*\S+)/,"number.nan"],[/@numberDate(?![ \t]*\S+)/,"number.date"],[/(".*?"|'.*?'|.*?)([ \t]*)(:)( |$)/,["type","white","operators","white"]],{include:"@flowScalars"},[/[^#]+/,{cases:{"@keywords":"keyword","@default":"string"}}]],object:[{include:"@whitespace"},{include:"@comment"},[/\}/,"@brackets","@pop"],[/,/,"delimiter.comma"],[/:(?= )/,"operators"],[/(?:".*?"|'.*?'|[^,\{\[]+?)(?=: )/,"type"],{include:"@flowCollections"},{include:"@flowScalars"},{include:"@tagHandle"},{include:"@anchor"},{include:"@flowNumber"},[/[^\},]+/,{cases:{"@keywords":"keyword","@default":"string"}}]],array:[{include:"@whitespace"},{include:"@comment"},[/\]/,"@brackets","@pop"],[/,/,"delimiter.comma"],{include:"@flowCollections"},{include:"@flowScalars"},{include:"@tagHandle"},{include:"@anchor"},{include:"@flowNumber"},[/[^\],]+/,{cases:{"@keywords":"keyword","@default":"string"}}]],multiString:[[/^( +).+$/,"string","@multiStringContinued.$1"]],multiStringContinued:[[/^( *).+$/,{cases:{"$1==$S2":"string","@default":{token:"@rematch",next:"@popall"}}}]],whitespace:[[/[ \t\r\n]+/,"white"]],comment:[[/#.*$/,"comment"]],flowCollections:[[/\[/,"@brackets","@array"],[/\{/,"@brackets","@object"]],flowScalars:[[/"([^"\\]|\\.)*$/,"string.invalid"],[/'([^'\\]|\\.)*$/,"string.invalid"],[/'[^']*'/,"string"],[/"/,"string","@doubleQuotedString"]],doubleQuotedString:[[/[^\\"]+/,"string"],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/"/,"string","@pop"]],blockStyle:[[/[>|][0-9]*[+-]?$/,"operators","@multiString"]],flowNumber:[[/@numberInteger(?=[ \t]*[,\]\}])/,"number"],[/@numberFloat(?=[ \t]*[,\]\}])/,"number.float"],[/@numberOctal(?=[ \t]*[,\]\}])/,"number.octal"],[/@numberHex(?=[ \t]*[,\]\}])/,"number.hex"],[/@numberInfinity(?=[ \t]*[,\]\}])/,"number.infinity"],[/@numberNaN(?=[ \t]*[,\]\}])/,"number.nan"],[/@numberDate(?=[ \t]*[,\]\}])/,"number.date"]],tagHandle:[[/\![^ ]*/,"tag"]],anchor:[[/[&*][^ ]+/,"namespace"]]}}}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL3lhbWwveWFtbC5qcyJdLCJuYW1lcyI6WyJjb25mIiwiY29tbWVudHMiLCJsaW5lQ29tbWVudCIsImJyYWNrZXRzIiwiYXV0b0Nsb3NpbmdQYWlycyIsIm9wZW4iLCJjbG9zZSIsInN1cnJvdW5kaW5nUGFpcnMiLCJmb2xkaW5nIiwib2ZmU2lkZSIsImxhbmd1YWdlIiwidG9rZW5Qb3N0Zml4IiwidG9rZW4iLCJrZXl3b3JkcyIsIm51bWJlckludGVnZXIiLCJudW1iZXJGbG9hdCIsIm51bWJlck9jdGFsIiwibnVtYmVySGV4IiwibnVtYmVySW5maW5pdHkiLCJudW1iZXJOYU4iLCJudW1iZXJEYXRlIiwiZXNjYXBlcyIsInRva2VuaXplciIsInJvb3QiLCJpbmNsdWRlIiwiY2FzZXMiLCJvYmplY3QiLCJhcnJheSIsIm11bHRpU3RyaW5nIiwibXVsdGlTdHJpbmdDb250aW51ZWQiLCJuZXh0Iiwid2hpdGVzcGFjZSIsImNvbW1lbnQiLCJmbG93Q29sbGVjdGlvbnMiLCJmbG93U2NhbGFycyIsImRvdWJsZVF1b3RlZFN0cmluZyIsImJsb2NrU3R5bGUiLCJmbG93TnVtYmVyIiwidGFnSGFuZGxlIiwiYW5jaG9yIl0sIm1hcHBpbmdzIjoia0hBQUEscUZBQU8sSUFBSUEsRUFBTyxDQUNkQyxTQUFVLENBQ05DLFlBQWEsS0FFakJDLFNBQVUsQ0FDTixDQUFDLElBQUssS0FDTixDQUFDLElBQUssS0FDTixDQUFDLElBQUssTUFFVkMsaUJBQWtCLENBQ2QsQ0FBRUMsS0FBTSxJQUFLQyxNQUFPLEtBQ3BCLENBQUVELEtBQU0sSUFBS0MsTUFBTyxLQUNwQixDQUFFRCxLQUFNLElBQUtDLE1BQU8sS0FDcEIsQ0FBRUQsS0FBTSxJQUFLQyxNQUFPLEtBQ3BCLENBQUVELEtBQU0sSUFBS0MsTUFBTyxNQUV4QkMsaUJBQWtCLENBQ2QsQ0FBRUYsS0FBTSxJ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aEMsQ0FBQyxtQ0FBb0MsbUJBQ3JDLENBQUMsOEJBQStCLGNBQ2hDLENBQUMsK0JBQWdDLGdCQUVyQ0MsVUFBVyxDQUFDLENBQUMsVUFBVyxRQUN4QkMsT0FBUSxDQUFDLENBQUMsWUFBYSIsImZpbGUiOiJqcy9jaHVuay0yZDBhYWIwNy5jNWIzODM4My5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgY29uZiA9IHtcbiAgICBjb21tZW50czoge1xuICAgICAgICBsaW5lQ29tbWVudDogJyMnXG4gICAgfSxcbiAgICBicmFja2V0czogW1xuICAgICAgICBbJ3snLCAnfSddLFxuICAgICAgICBbJ1snLCAnXSddLFxuICAgICAgICBbJygnLCAnKSddXG4gICAgXSxcbiAgICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgICAgIHsgb3BlbjogJ3snLCBjbG9zZTogJ30nIH0sXG4gICAgICAgIHsgb3BlbjogJ1snLCBjbG9zZTogJ10nIH0sXG4gICAgICAgIHsgb3BlbjogJygnLCBjbG9zZTogJyknIH0sXG4gICAgICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicgfSxcbiAgICAgICAgeyBvcGVuOiBcIidcIiwgY2xvc2U6IFwiJ1wiIH1cbiAgICBdLFxuICAgIHN1cnJvdW5kaW5nUGFpcnM6IFtcbiAgICAgICAgeyBvcGVuOiAneycsIGNsb3NlOiAnfScgfSxcbiAgICAgICAgeyBvcGVuOiAnWycsIGNsb3NlOiAnXScgfSxcbiAgICAgICAgeyBvcGVuOiAnKCcsIGNsb3NlOiAnKScgfSxcbiAgICAgICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9LFxuICAgICAgICB7IG9wZW46IFwiJ1wiLCBjbG9zZTogXCInXCIgfVxuICAgIF0sXG4gICAgZm9sZGluZzoge1xuICAgICAgICBvZmZTaWRlOiB0cnVlXG4gICAgfVxufTtcbmV4cG9ydCB2YXIgbGFuZ3VhZ2UgPSB7XG4gICAgdG9rZW5Qb3N0Zml4OiAnLnlhbWwnLFxuICAgIGJyYWNrZXRzOiBbXG4gICAgICAgIHsgdG9rZW46ICdkZWxpbWl0ZXIuYnJhY2tldCcsIG9wZW46ICd7JywgY2xvc2U6ICd9JyB9LFxuICAgICAgICB7IHRva2VuOiAnZGVsaW1pdGVyLnNxdWFyZScsIG9wZW46ICdbJywgY2xvc2U6ICddJyB9XG4gICAgXSxcbiAgICBrZXl3b3JkczogWyd0cnVlJywgJ1RydWUnLCAnVFJVRScsICdmYWxzZScsICdGYWxzZScsICdGQUxTRScsICdudWxsJywgJ051bGwnLCAnTnVsbCcsICd+J10sXG4gICAgbnVtYmVySW50ZWdlcjogLyg/OjB8WystXT9bMC05XSspLyxcbiAgICBudW1iZXJGbG9hdDogLyg/OjB8WystXT9bMC05XSspKD86XFwuWzAtOV0rKT8oPzplWy0rXVsxLTldWzAtOV0qKT8vLFxuICAgIG51bWJlck9jdGFsOiAvMG9bMC03XSsvLFxuICAgIG51bWJlckhleDogLzB4WzAtOWEtZkEtRl0rLyxcbiAgICBudW1iZXJJbmZpbml0eTogL1srLV0/XFwuKD86aW5mfEluZnxJTkYpLyxcbiAgICBudW1iZXJOYU46IC9cXC4oPzpuYW58TmFufE5BTikvLFxuICAgIG51bWJlckRhdGU6IC9cXGR7NH0tXFxkXFxkLVxcZFxcZChbVHQgXVxcZFxcZDpcXGRcXGQ6XFxkXFxkKFxcLlxcZCspPygoID9bKy1dXFxkXFxkPyg6XFxkXFxkKT8pfFopPyk/LyxcbiAgICBlc2NhcGVzOiAvXFxcXCg/OltidG5mclxcXFxcIiddfFswLTddWzAtN10/fFswLTNdWzAtN117Mn0pLyxcbiAgICB0b2tlbml6ZXI6IHtcbiAgICAgICAgcm9vdDogW1xuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHdoaXRlc3BhY2UnIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAY29tbWVudCcgfSxcbiAgICAgICAgICAgIC8vIERpcmVjdGl2ZVxuICAgICAgICAgICAgWy8lW14gXSsuKiQvLCAnbWV0YS5kaXJlY3RpdmUnXSxcbiAgICAgICAgICAgIC8vIERvY3VtZW50IE1hcmtlcnNcbiAgICAgICAgICAgIFsvLS0tLywgJ29wZXJhdG9ycy5kaXJlY3RpdmVzRW5kJ10sXG4gICAgICAgICAgICBbL1xcLnszfS8sICdvcGVyYXRvcnMuZG9jdW1lbnRFbmQnXSxcbiAgICAgICAgICAgIC8vIEJsb2NrIFN0cnVjdHVyZSBJbmRpY2F0b3JzXG4gICAgICAgICAgICBbL1stPzpdKD89ICkvLCAnb3BlcmF0b3JzJ10sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAYW5jaG9yJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHRhZ0hhbmRsZScgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BmbG93Q29sbGVjdGlvbnMnIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAYmxvY2tTdHlsZScgfSxcbiAgICAgICAgICAgIC8vIE51bWJlcnNcbiAgICAgICAgICAgIFsvQG51bWJlckludGVnZXIoPyFbIFxcdF0qXFxTKykvLCAnbnVtYmVyJ10sXG4gICAgICAgICAgICBbL0BudW1iZXJGbG9hdCg/IVsgXFx0XSpcXFMrKS8sICdudW1iZXIuZmxvYXQnXSxcbiAgICAgICAgICAgIFsvQG51bWJlck9jdGFsKD8hWyBcXHRdKlxcUyspLywgJ251bWJlci5vY3RhbCddLFxuICAgICAgICAgICAgWy9AbnVtYmVySGV4KD8hWyBcXHRdKlxcUyspLywgJ251bWJlci5oZXgnXSxcbiAgICAgICAgICAgIFsvQG51bWJlckluZmluaXR5KD8hWyBcXHRdKlxcUyspLywgJ251bWJlci5pbmZpbml0eSddLFxuICAgICAgICAgICAgWy9AbnVtYmVyTmFOKD8hWyBcXHRdKlxcUyspLywgJ251bWJlci5uYW4nXSxcbiAgICAgICAgICAgIFsvQG51bWJlckRhdGUoPyFbIFxcdF0qXFxTKykvLCAnbnVtYmVyLmRhdGUnXSxcbiAgICAgICAgICAgIC8vIEtleTpWYWx1ZSBwYWlyXG4gICAgICAgICAgICBbLyhcIi4qP1wifCcuKj8nfC4qPykoWyBcXHRdKikoOikoIHwkKS8sIFsndHlwZScsICd3aGl0ZScsICdvcGVyYXRvcnMnLCAnd2hpdGUnXV0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAZmxvd1NjYWxhcnMnIH0sXG4gICAgICAgICAgICAvLyBTdHJpbmcgbm9kZXNcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAvW14jXSsvLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdAa2V5d29yZHMnOiAna2V5d29yZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGRlZmF1bHQnOiAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICBdLFxuICAgICAgICAvLyBGbG93IENvbGxlY3Rpb246IEZsb3cgTWFwcGluZ1xuICAgICAgICBvYmplY3Q6IFtcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0B3aGl0ZXNwYWNlJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGNvbW1lbnQnIH0sXG4gICAgICAgICAgICAvLyBGbG93IE1hcHBpbmcgdGVybWluYXRpb25cbiAgICAgICAgICAgIFsvXFx9LywgJ0BicmFja2V0cycsICdAcG9wJ10sXG4gICAgICAgICAgICAvLyBGbG93IE1hcHBpbmcgZGVsaW1pdGVyXG4gICAgICAgICAgICBbLywvLCAnZGVsaW1pdGVyLmNvbW1hJ10sXG4gICAgICAgICAgICAvLyBGbG93IE1hcHBpbmcgS2V5OlZhbHVlIGRlbGltaXRlclxuICAgICAgICAgICAgWy86KD89ICkvLCAnb3BlcmF0b3JzJ10sXG4gICAgICAgICAgICAvLyBGbG93IE1hcHBpbmcgS2V5OlZhbHVlIGtleVxuICAgICAgICAgICAgWy8oPzpcIi4qP1wifCcuKj8nfFteLFxce1xcW10rPykoPz06ICkvLCAndHlwZSddLFxuICAgICAgICAgICAgLy8gU3RhcnQgRmxvdyBTdHlsZVxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGZsb3dDb2xsZWN0aW9ucycgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BmbG93U2NhbGFycycgfSxcbiAgICAgICAgICAgIC8vIFNjYWxhciBEYXRhIHR5cGVzXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAdGFnSGFuZGxlJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGFuY2hvcicgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BmbG93TnVtYmVyJyB9LFxuICAgICAgICAgICAgLy8gT3RoZXIgdmFsdWUgKGtleXdvcmQgb3Igc3RyaW5nKVxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIC9bXlxcfSxdKy8sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0BrZXl3b3Jkcyc6ICdrZXl3b3JkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIF0sXG4gICAgICAgIC8vIEZsb3cgQ29sbGVjdGlvbjogRmxvdyBTZXF1ZW5jZVxuICAgICAgICBhcnJheTogW1xuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQHdoaXRlc3BhY2UnIH0sXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAY29tbWVudCcgfSxcbiAgICAgICAgICAgIC8vIEZsb3cgU2VxdWVuY2UgdGVybWluYXRpb25cbiAgICAgICAgICAgIFsvXFxdLywgJ0BicmFja2V0cycsICdAcG9wJ10sXG4gICAgICAgICAgICAvLyBGbG93IFNlcXVlbmNlIGRlbGltaXRlclxuICAgICAgICAgICAgWy8sLywgJ2RlbGltaXRlci5jb21tYSddLFxuICAgICAgICAgICAgLy8gU3RhcnQgRmxvdyBTdHlsZVxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGZsb3dDb2xsZWN0aW9ucycgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BmbG93U2NhbGFycycgfSxcbiAgICAgICAgICAgIC8vIFNjYWxhciBEYXRhIHR5cGVzXG4gICAgICAgICAgICB7IGluY2x1ZGU6ICdAdGFnSGFuZGxlJyB9LFxuICAgICAgICAgICAgeyBpbmNsdWRlOiAnQGFuY2hvcicgfSxcbiAgICAgICAgICAgIHsgaW5jbHVkZTogJ0BmbG93TnVtYmVyJyB9LFxuICAgICAgICAgICAgLy8gT3RoZXIgdmFsdWUgKGtleXdvcmQgb3Igc3RyaW5nKVxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIC9bXlxcXSxdKy8sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0BrZXl3b3Jkcyc6ICdrZXl3b3JkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdAZGVmYXVsdCc6ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIF0sXG4gICAgICAgIC8vIEZpcnN0IGxpbmUgb2YgYSBCbG9jayBTdHlsZVxuICAgICAgICBtdWx0aVN0cmluZzogW1svXiggKykuKyQvLCAnc3RyaW5nJywgJ0BtdWx0aVN0cmluZ0NvbnRpbnVlZC4kMSddXSxcbiAgICAgICAgLy8gRnVydGhlciBsaW5lcyBvZiBhIEJsb2NrIFN0eWxlXG4gICAgICAgIC8vICAgV29ya2Fyb3VuZCBmb3IgaW5kZW50YXRpb24gZGV0ZWN0aW9uXG4gICAgICAgIG11bHRpU3RyaW5nQ29udGludWVkOiBbXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgL14oICopLiskLyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnJDE9PSRTMic6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0BkZWZhdWx0JzogeyB0b2tlbjogJ0ByZW1hdGNoJywgbmV4dDogJ0Bwb3BhbGwnIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgXSxcbiAgICAgICAgd2hpdGVzcGFjZTogW1svWyBcXHRcXHJcXG5dKy8sICd3aGl0ZSddXSxcbiAgICAgICAgLy8gT25seSBsaW5lIGNvbW1lbnRzXG4gICAgICAgIGNvbW1lbnQ6IFtbLyMuKiQvLCAnY29tbWVudCddXSxcbiAgICAgICAgLy8gU3RhcnQgRmxvdyBDb2xsZWN0aW9uc1xuICAgICAgICBmbG93Q29sbGVjdGlvbnM6IFtcbiAgICAgICAgICAgIFsvXFxbLywgJ0BicmFja2V0cycsICdAYXJyYXknXSxcbiAgICAgICAgICAgIFsvXFx7LywgJ0BicmFja2V0cycsICdAb2JqZWN0J11cbiAgICAgICAgXSxcbiAgICAgICAgLy8gU3RhcnQgRmxvdyBTY2FsYXJzIChxdW90ZWQgc3RyaW5ncylcbiAgICAgICAgZmxvd1NjYWxhcnM6IFtcbiAgICAgICAgICAgIFsvXCIoW15cIlxcXFxdfFxcXFwuKSokLywgJ3N0cmluZy5pbnZhbGlkJ10sXG4gICAgICAgICAgICBbLycoW14nXFxcXF18XFxcXC4pKiQvLCAnc3RyaW5nLmludmFsaWQnXSxcbiAgICAgICAgICAgIFsvJ1teJ10qJy8sICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsvXCIvLCAnc3RyaW5nJywgJ0Bkb3VibGVRdW90ZWRTdHJpbmcnXVxuICAgICAgICBdLFxuICAgICAgICBkb3VibGVRdW90ZWRTdHJpbmc6IFtcbiAgICAgICAgICAgIFsvW15cXFxcXCJdKy8sICdzdHJpbmcnXSxcbiAgICAgICAgICAgIFsvQGVzY2FwZXMvLCAnc3RyaW5nLmVzY2FwZSddLFxuICAgICAgICAgICAgWy9cXFxcLi8sICdzdHJpbmcuZXNjYXBlLmludmFsaWQnXSxcbiAgICAgICAgICAgIFsvXCIvLCAnc3RyaW5nJywgJ0Bwb3AnXVxuICAgICAgICBdLFxuICAgICAgICAvLyBTdGFydCBCbG9jayBTY2FsYXJcbiAgICAgICAgYmxvY2tTdHlsZTogW1svWz58XVswLTldKlsrLV0/JC8sICdvcGVyYXRvcnMnLCAnQG11bHRpU3RyaW5nJ11dLFxuICAgICAgICAvLyBOdW1iZXJzIGluIEZsb3cgQ29sbGVjdGlvbnMgKHRlcm1pbmF0ZSB3aXRoICxdfSlcbiAgICAgICAgZmxvd051bWJlcjogW1xuICAgICAgICAgICAgWy9AbnVtYmVySW50ZWdlcig/PVsgXFx0XSpbLFxcXVxcfV0pLywgJ251bWJlciddLFxuICAgICAgICAgICAgWy9AbnVtYmVyRmxvYXQoPz1bIFxcdF0qWyxcXF1cXH1dKS8sICdudW1iZXIuZmxvYXQnXSxcbiAgICAgICAgICAgIFsvQG51bWJlck9jdGFsKD89WyBcXHRdKlssXFxdXFx9XSkvLCAnbnVtYmVyLm9jdGFsJ10sXG4gICAgICAgICAgICBbL0BudW1iZXJIZXgoPz1bIFxcdF0qWyxcXF1cXH1dKS8sICdudW1iZXIuaGV4J10sXG4gICAgICAgICAgICBbL0BudW1iZXJJbmZpbml0eSg/PVsgXFx0XSpbLFxcXVxcfV0pLywgJ251bWJlci5pbmZpbml0eSddLFxuICAgICAgICAgICAgWy9AbnVtYmVyTmFOKD89WyBcXHRdKlssXFxdXFx9XSkvLCAnbnVtYmVyLm5hbiddLFxuICAgICAgICAgICAgWy9AbnVtYmVyRGF0ZSg/PVsgXFx0XSpbLFxcXVxcfV0pLywgJ251bWJlci5kYXRlJ11cbiAgICAgICAgXSxcbiAgICAgICAgdGFnSGFuZGxlOiBbWy9cXCFbXiBdKi8sICd0YWcnXV0sXG4gICAgICAgIGFuY2hvcjogW1svWyYqXVteIF0rLywgJ25hbWVzcGFjZSddXVxuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9