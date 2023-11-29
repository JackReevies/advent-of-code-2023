module.exports.convert = function convert(html) {
  const articleRegex = /<article class="day-desc"><h2>--- (Day \d+: .+?) ---<\/h2><p>(.+?)<\/article>/gms.exec(html)
  const title = articleRegex[1]
  const content = articleRegex[2]

  let markdown = `# ${title} \n${content}`
  // Replace relative hyperlinks
  markdown = markdown.replace(/<a href="\/(.+?)"( target="_blank")?>(.+?)<\/a>/gms, `[$3](https://adventofcode.com/$1)`)
  // Replace absolute hyperlinks
  markdown = markdown.replace(/<a href="(.+?)"( target="_blank")?>(.+?)<\/a>/gms, `[$3]($1)`)
  // Replace hover text on words
  markdown = markdown.replace(/<span title=".+?">(.+?)<\/span>/gm, '$1')
  // Replace emphasized code text
  markdown = markdown.replace(/(<pre>)?<code><em>(.+?)<\/em><\/code>(<\/pre>)?/gm, '**`$2`**')
  // Replace code block
  markdown = markdown.replace(/(<pre>)?<code>(.+?)<\/code>(<\/pre>)?/gm, '`$2`')
  // Replace code text
  markdown = markdown.replace(/(<pre>)?<code>(.+?)<\/code>(<\/pre>)?/gms, '```\n$2```')
  // Replace emphasized text
  markdown = markdown.replace(/<em( class="star")?>(.+?)<\/em>/g, '**$2**')
  // Get rid of <p> tags
  markdown = markdown.replace(/<p>/g, '')
  // Replace closing p tags
  markdown = markdown.replace(/<\/p>/g, '\n')
  // Replace unordered list
  markdown = markdown.replace(/<ul>(.+?)<\/ul>/gms, '$1')
  // Replace list items
  markdown = markdown.replace(/<li>(.+?)<\/li>/gms, '+ $1\n')
  return markdown
}