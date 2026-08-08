// Load and render resume from resume.json
async function loadResume() {
    try {
        // Try multiple possible paths for resume.json
        const paths = [
            './resume.json',
            '/Portfolio_kusuma/resume.json',
            window.location.origin + window.location.pathname.replace(/\/$/, '') + '/resume.json'
        ];

        let resume = null;
        let lastError = null;

        for (const path of paths) {
            try {
                console.log('Trying to fetch:', path);
                const response = await fetch(path);
                if (response.ok) {
                    resume = await response.json();
                    console.log('Successfully loaded resume from:', path);
                    break;
                }
            } catch (err) {
                lastError = err;
                console.log('Failed to fetch from ' + path + ':', err.message);
            }
        }

        if (!resume) {
            throw lastError || new Error('Could not load resume.json from any path');
        }

        renderResume(resume);
    } catch (error) {
        console.error('Error loading resume:', error);
        document.querySelector('.container').innerHTML = '<p>Error loading resume data. ' + error.message + '</p>';
    }
}

function renderResume(resume) {
    // Render basics section
    if (resume.basics) {
        renderBasics(resume.basics);
    }

    // Render work section (show only if has data)
    if (resume.work && resume.work.length > 0) {
        renderWork(resume.work);
        document.getElementById('work-section').classList.remove('hidden');
    }

    // Render education section (show only if has data)
    if (resume.education && resume.education.length > 0) {
        renderEducation(resume.education);
        document.getElementById('education-section').classList.remove('hidden');
    }

    // Render skills section (show only if has data)
    if (resume.skills && resume.skills.length > 0) {
        renderSkills(resume.skills);
        document.getElementById('skills-section').classList.remove('hidden');
    }

    // Render certificates section (show only if has data)
    if (resume.certificates && resume.certificates.length > 0) {
        renderCertificates(resume.certificates);
        document.getElementById('certificates-section').classList.remove('hidden');
    }

    // Render projects section (show only if has data)
    if (resume.projects && resume.projects.length > 0) {
        renderProjects(resume.projects);
        document.getElementById('projects-section').classList.remove('hidden');
    }
}

function renderBasics(basics) {
    // Set name
    if (basics.name) {
        document.getElementById('basics-name').textContent = basics.name;
        document.title = `${basics.name} - Portfolio`;
    }

    // Set label
    if (basics.label) {
        document.getElementById('basics-label').textContent = basics.label;
        document.getElementById('basics-label').classList.remove('hidden');
    }

    // Set image
    if (basics.image) {
        const imgElement = document.getElementById('basics-image');
        imgElement.src = basics.image;
        imgElement.classList.remove('hidden');
    }

    // Set summary
    if (basics.summary) {
        document.getElementById('basics-summary').textContent = basics.summary;
        document.getElementById('basics-summary').classList.remove('hidden');
    }

    // Set email
    if (basics.email) {
        const emailElement = document.getElementById('basics-email');
        const emailText = document.getElementById('basics-email-text');
        emailElement.href = `mailto:${basics.email}`;
        emailText.textContent = basics.email;
        emailElement.classList.remove('hidden');
    }

    // Set phone
    if (basics.phone) {
        document.getElementById('basics-phone').textContent = basics.phone;
        document.getElementById('basics-phone-text').textContent = basics.phone;
        document.getElementById('basics-phone').classList.remove('hidden');
    }

    // Set location
    if (basics.location) {
        const locationParts = [];
        if (basics.location.city) locationParts.push(basics.location.city);
        if (basics.location.region) locationParts.push(basics.location.region);
        if (locationParts.length > 0) {
            document.getElementById('basics-location').textContent = locationParts.join(', ');
            document.getElementById('basics-location-text').textContent = locationParts.join(', ');
            document.getElementById('basics-location').classList.remove('hidden');
        }
    }
}

function renderWork(work) {
    const workList = document.getElementById('work-list');
    workList.innerHTML = '';

    work.forEach(job => {
        const jobElement = document.createElement('article');
        jobElement.className = 'item';

        let html = '<div class="item-header">';
        if (job.position) {
            html += `<h3 class="item-title">${escapeHtml(job.position)}</h3>`;
        }
        if (job.startDate || job.endDate) {
            const startDate = formatDate(job.startDate);
            const endDate = job.endDate ? formatDate(job.endDate) : 'Present';
            html += `<span class="item-date">${startDate} – ${endDate}</span>`;
        }
        html += '</div>';

        if (job.name) {
            html += `<p class="item-subtitle">${escapeHtml(job.name)}</p>`;
        }

        if (job.location) {
            html += `<p class="item-meta">📍 ${escapeHtml(job.location)}</p>`;
        }

        if (job.summary) {
            html += `<p class="item-description">${escapeHtml(job.summary)}</p>`;
        }

        if (job.highlights && job.highlights.length > 0) {
            html += '<ul class="highlights">';
            job.highlights.forEach(highlight => {
                html += `<li>${escapeHtml(highlight)}</li>`;
            });
            html += '</ul>';
        }

        jobElement.innerHTML = html;
        workList.appendChild(jobElement);
    });
}

function renderEducation(education) {
    const eduList = document.getElementById('education-list');
    eduList.innerHTML = '';

    education.forEach(edu => {
        const eduElement = document.createElement('article');
        eduElement.className = 'item';

        let html = '<div class="item-header">';
        if (edu.studyType || edu.area) {
            const degree = [edu.studyType, edu.area].filter(x => x).join(', ');
            html += `<h3 class="item-title">${escapeHtml(degree)}</h3>`;
        }
        if (edu.startDate || edu.endDate) {
            const startDate = formatDate(edu.startDate);
            const endDate = edu.endDate ? formatDate(edu.endDate) : 'Present';
            html += `<span class="item-date">${startDate} – ${endDate}</span>`;
        }
        html += '</div>';

        if (edu.institution) {
            html += `<p class="item-subtitle">${escapeHtml(edu.institution)}</p>`;
        }

        if (edu.score) {
            html += `<p class="item-meta">Score: ${escapeHtml(edu.score)}</p>`;
        }

        eduElement.innerHTML = html;
        eduList.appendChild(eduElement);
    });
}

function renderSkills(skills) {
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '';

    skills.forEach(skillGroup => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';

        let html = '';
        if (skillGroup.name) {
            html += `<h3 class="skill-name">${escapeHtml(skillGroup.name)}</h3>`;
        }
        if (skillGroup.level) {
            html += `<p class="skill-level">Level: ${escapeHtml(skillGroup.level)}</p>`;
        }
        if (skillGroup.keywords && skillGroup.keywords.length > 0) {
            html += '<div class="skill-keywords">';
            skillGroup.keywords.forEach(keyword => {
                html += `<span class="skill-tag">${escapeHtml(keyword)}</span>`;
            });
            html += '</div>';
        }

        skillCard.innerHTML = html;
        skillsList.appendChild(skillCard);
    });
}

function renderCertificates(certificates) {
    const certList = document.getElementById('certificates-list');
    certList.innerHTML = '';

    certificates.forEach(cert => {
        const certElement = document.createElement('article');
        certElement.className = 'item';

        let html = '<div class="item-header">';
        if (cert.name) {
            html += `<h3 class="item-title">${escapeHtml(cert.name)}</h3>`;
        }
        if (cert.startDate || cert.endDate) {
            const startDate = formatDate(cert.startDate);
            const endDate = cert.endDate ? formatDate(cert.endDate) : 'Present';
            html += `<span class="item-date">${startDate} – ${endDate}</span>`;
        }
        html += '</div>';

        if (cert.issuer) {
            html += `<p class="item-subtitle">Issued by: ${escapeHtml(cert.issuer)}</p>`;
        }

        if (cert.url) {
            html += `<p class="item-meta"><a href="${escapeHtml(cert.url)}" target="_blank" rel="noopener noreferrer">View Credential</a></p>`;
        }

        certElement.innerHTML = html;
        certList.appendChild(certElement);
    });
}

function renderProjects(projects) {
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';

    projects.forEach(project => {
        const projectElement = document.createElement('article');
        projectElement.className = 'item';

        let html = '<div class="item-header">';
        if (project.name) {
            html += `<h3 class="item-title">${escapeHtml(project.name)}</h3>`;
        }
        if (project.startDate || project.endDate) {
            const startDate = formatDate(project.startDate);
            const endDate = project.endDate ? formatDate(project.endDate) : 'Present';
            html += `<span class="item-date">${startDate} – ${endDate}</span>`;
        }
        html += '</div>';

        if (project.description) {
            html += `<p class="item-description">${escapeHtml(project.description)}</p>`;
        }

        if (project.highlights && project.highlights.length > 0) {
            html += '<ul class="highlights">';
            project.highlights.forEach(highlight => {
                html += `<li>${escapeHtml(highlight)}</li>`;
            });
            html += '</ul>';
        }

        if (project.url) {
            html += `<p class="item-meta"><a href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer">View Project</a></p>`;
        }

        if (project.entity || project.type || project.roles) {
            const metaItems = [];
            if (project.entity) metaItems.push(`Entity: ${project.entity}`);
            if (project.type) metaItems.push(`Type: ${project.type}`);
            if (project.roles) metaItems.push(`Roles: ${project.roles.join(', ')}`);
            if (metaItems.length > 0) {
                html += `<p class="item-meta">${metaItems.join(' | ')}</p>`;
            }
        }

        projectElement.innerHTML = html;
        projectsList.appendChild(projectElement);
    });
}

// Utility function to escape HTML special characters
function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Utility function to format dates
function formatDate(dateString) {
    if (!dateString) return '';

    // Handle YYYY-MM format
    if (dateString.match(/^\d{4}-\d{2}$/)) {
        const [year, month] = dateString.split('-');
        const date = new Date(year, month - 1);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }

    // Handle YYYY format
    if (dateString.match(/^\d{4}$/)) {
        return dateString;
    }

    return dateString;
}

// Load resume when DOM is ready
document.addEventListener('DOMContentLoaded', loadResume);
