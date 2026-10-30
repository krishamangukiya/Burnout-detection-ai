import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import os

# ============================================================
# GANTT CHART GENERATOR - BURNOUT DETECTION SYSTEM
# Matches exact project schedule (12/07/2026 - 17/09/2026)
# ============================================================

# Typography & Style
plt.rcParams['font.family'] = 'serif'
plt.rcParams['font.serif'] = ['DejaVu Serif', 'Times New Roman', 'Georgia']
plt.rcParams['mathtext.fontset'] = 'dejavuserif'

# Task data matching the project timeline
tasks = [
    {
        'name': 'Project Title & Problem Statement',
        'start': 1.0,
        'end': 2.0,
        'label': 'W1–W2',
        'color': '#7f7f7f', # Documentation
        'category': 'Documentation'
    },
    {
        'name': 'Requirement analysis',
        'start': 1.7,
        'end': 2.6,
        'label': 'W1–W2',
        'color': '#7f7f7f', # Documentation
        'category': 'Documentation'
    },
    {
        'name': 'System Architecture',
        'start': 2.7,
        'end': 4.6,
        'label': 'W2–W4',
        'color': '#7f7f7f', # Documentation
        'category': 'Documentation'
    },
    {
        'name': 'System design (UI/UX)',
        'start': 4.6,
        'end': 5.6,
        'label': 'W4–W5',
        'color': '#b79ce6', # Frontend
        'category': 'Frontend'
    },
    {
        'name': 'Dataset and ML work',
        'start': 5.6,
        'end': 6.6,
        'label': 'W5–W6',
        'color': '#5b3a9e', # Machine learning
        'category': 'Machine learning'
    },
    {
        'name': 'Frontend development (React/Vite)',
        'start': 6.6,
        'end': 7.6,
        'label': 'W6–W7',
        'color': '#b79ce6', # Frontend
        'category': 'Frontend'
    },
    {
        'name': 'Backend development & Integration (FastAPI)',
        'start': 7.6,
        'end': 8.6,
        'label': 'W7–W8',
        'color': '#8e6bd1', # Backend
        'category': 'Backend'
    },
    {
        'name': 'Testing & validation',
        'start': 8.6,
        'end': 9.6,
        'label': 'W8–W9',
        'color': '#2e75b6', # Integration / testing
        'category': 'Integration / testing'
    },
    {
        'name': 'Final report preparation',
        'start': 9.6,
        'end': 10.6,
        'label': 'W9–W10',
        'color': '#7f7f7f', # Documentation
        'category': 'Documentation'
    }
]

fig, ax = plt.subplots(figsize=(11, 5.8), dpi=300)

y_positions = list(range(len(tasks)))[::-1]

for i, task in enumerate(tasks):
    y = y_positions[i]
    start = task['start']
    width = task['end'] - start
    
    # Draw horizontal bar matching reference proportions
    ax.barh(y, width, left=start, height=0.46, color=task['color'], edgecolor='none', zorder=3)
    
    # White centered text inside the bar
    ax.text(start + width / 2, y, task['label'], ha='center', va='center', 
            color='white', fontsize=8.5, fontweight='bold', zorder=4)

# Format y-axis
ax.set_yticks(y_positions)
ax.set_yticklabels([t['name'] for t in tasks], fontsize=9.5)
ax.tick_params(axis='y', length=4, color='#333333')

# Format x-axis
ax.set_xlim(0.8, 11.0)
weeks = list(range(1, 11))
ax.set_xticks(weeks)
ax.set_xticklabels([f'W{w}' for w in weeks], fontsize=9.5)
ax.set_xlabel('Project week (12/07/2026 – 17/09/2026)', fontsize=9.5, labelpad=10)
ax.tick_params(axis='x', length=4, color='#333333')

# Title
ax.set_title('Planned Schedule (Gantt Chart) — Burnout Detection System', fontsize=11.5, fontweight='bold', pad=16)

# Vertical grid lines
ax.grid(axis='x', color='#eaeaea', linestyle='-', linewidth=0.9, zorder=0)
ax.set_axisbelow(True)

# Spines styling
for spine in ['top', 'right']:
    ax.spines[spine].set_visible(False)
ax.spines['left'].set_color('#222222')
ax.spines['left'].set_linewidth(1.0)
ax.spines['bottom'].set_color('#222222')
ax.spines['bottom'].set_linewidth(1.0)

# Legend elements with exact color matching
legend_elements = [
    mpatches.Patch(color='#5b3a9e', label='Machine learning'),
    mpatches.Patch(color='#8e6bd1', label='Backend'),
    mpatches.Patch(color='#b79ce6', label='Frontend'),
    mpatches.Patch(color='#2e75b6', label='Integration / testing'),
    mpatches.Patch(color='#7f7f7f', label='Documentation')
]

ax.legend(handles=legend_elements, loc='upper center', bbox_to_anchor=(0.5, -0.15),
          ncol=5, frameon=False, fontsize=8.8)

plt.tight_layout()

# Save
output_path = os.path.join(os.path.dirname(__file__), 'burnout_gantt_chart.png')
plt.savefig(output_path, bbox_inches='tight')
print(f'Saved Gantt chart to: {output_path}')
