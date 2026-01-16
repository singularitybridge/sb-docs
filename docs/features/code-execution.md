---
sidebar_position: 3
---

# Code Execution

Code execution enables agents to run Python code for data processing, analysis, and file manipulation.

## Overview

The code execution feature uses OpenAI's Code Interpreter to:
- Process CSV and Excel files
- Run data analysis scripts
- Transform and manipulate data
- Generate visualizations

## How It Works

```
User Request
    │
    ▼
┌─────────────────┐
│ Agent decides   │  Determines code is needed
│ to use code     │
└─────────────────┘
    │
    ▼
┌─────────────────┐
│ OpenAI Code     │  Executes Python in sandbox
│ Interpreter     │
└─────────────────┘
    │
    ▼
┌─────────────────┐
│ Results         │  Returns output/files
└─────────────────┘
```

## Available Actions

### executeCode

Run custom Python code.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | string | Yes | Python code to execute |
| `fileUrl` | string | No | URL of file to process |
| `fileBase64` | string | No | Base64-encoded file |

**Example:**

```json
{
  "action": "executeCode",
  "arguments": {
    "code": "import pandas as pd\ndf = pd.read_csv('data.csv')\nprint(df.describe())",
    "fileUrl": "https://example.com/data.csv"
  }
}
```

### processFile

Run predefined operations on files.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `operation` | string | Yes | Operation type |
| `fileUrl` | string | Yes | File URL |

**Operations:**

| Operation | Description |
|-----------|-------------|
| `analyze` | Statistical analysis |
| `transform` | Data transformation |
| `parse_excel` | Excel file parsing |

**Example:**

```json
{
  "action": "processFile",
  "arguments": {
    "operation": "analyze",
    "fileUrl": "https://example.com/sales.csv"
  }
}
```

## Supported File Types

| Type | Extensions | Notes |
|------|------------|-------|
| CSV | .csv | Tabular data |
| Excel | .xlsx, .xls | Spreadsheets |
| JSON | .json | Structured data |
| Text | .txt | Plain text |
| Images | .png, .jpg | For visualization |

## Common Use Cases

### Data Analysis

```python
import pandas as pd
import numpy as np

# Load and analyze
df = pd.read_csv('data.csv')
print("Shape:", df.shape)
print("\nStatistics:")
print(df.describe())
print("\nCorrelations:")
print(df.corr())
```

### Data Transformation

```python
import pandas as pd

# Load
df = pd.read_csv('data.csv')

# Transform
df['date'] = pd.to_datetime(df['date'])
df['revenue'] = df['quantity'] * df['price']
df_grouped = df.groupby('category').sum()

# Save
df_grouped.to_csv('output.csv')
```

### Excel Processing

```python
import pandas as pd

# Read Excel with multiple sheets
xlsx = pd.ExcelFile('report.xlsx')
sheets = {}
for sheet_name in xlsx.sheet_names:
    sheets[sheet_name] = pd.read_excel(xlsx, sheet_name)
    print(f"\n{sheet_name}:")
    print(sheets[sheet_name].head())
```

## File Storage

Output files are stored temporarily:

| Scope | TTL | Use Case |
|-------|-----|----------|
| `temporary` | 10 min | Code execution outputs |
| `session` | 24 hours | Working files |

### Retrieving Output Files

```typescript
// Files are returned in the response
const result = await execute({
  action: "executeCode",
  arguments: {
    code: "...",
    fileUrl: "..."
  }
});

// Access output files
const outputFiles = result.files;
```

## Security

### Sandbox Environment

- Code runs in isolated sandbox
- No network access from code
- Limited execution time
- Resource constraints

### Best Practices

- Validate input files
- Handle errors gracefully
- Don't store sensitive data
- Clean up temporary files

## Limitations

- Maximum execution time: 60 seconds
- Maximum file size: 50MB
- Python only (no other languages)
- No external network requests

## Related

- [Actions](/concepts/actions)
- [OpenAI Integration](/integrations/openai)
- [Workspace](/concepts/workspace)
