$(document).ready(function() {
    const username = "KanaMeisa";
    const apiUrl = `https://api.github.com/users/${username}/events/public`;
  
    $.getJSON(apiUrl, function(events) {
      let output = "<ul>";
  
      events.slice(0, 10).forEach(function(event) {
        const type = event.type;
        const repo = event.repo.name;
        const date = new Date(event.created_at).toLocaleDateString();
  
        output += `<li>${type} at <a href="https://github.com/${repo}" target="_blank">${repo}</a> on ${date}</li>`;
      });
  
      output += "</ul>";
      $("#github-activity").html(output);
    });
  });