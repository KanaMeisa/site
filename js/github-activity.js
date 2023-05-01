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

  const token = "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"; // 将此替换为你的GitHub个人访问令牌
  const username = "KanaMeisa"; // 将此替换为你想要显示活动的GitHub用户名
  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                weekday
              }
            }
          }
        }
      }
    }
  `;
  
  $.ajax({
    url: "https://api.github.com/graphql",
    type: "POST",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    data: JSON.stringify({ query: query }),
    contentType: "application/json",
    success: function(response) {
      const calendar = response.data.user.contributionsCollection.contributionCalendar;
      const weeks = calendar.weeks;
  
      let output = "";
  
      weeks.forEach(week => {
        week.contributionDays.forEach(day => {
          const level = getContributionLevel(day.contributionCount);
  
          output += `<div class="github-day" data-level="${level}" title="${day.date}: ${day.contributionCount} contributions"></div>`;
        });
      });
  
      $("#github-calendar").html(output);
    }
  });
  
  function getContributionLevel(contributions) {
    if (contributions === 0) {
      return 0;
    } else if (contributions < 10) {
      return 1;
    } else if (contributions < 20) {
      return 2;
    } else if (contributions < 30) {
      return 3;
    } else {
      return 4;
    }
  }
  