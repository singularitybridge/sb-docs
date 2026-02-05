---
sidebar_position: 8
---

# Fly.io Integration

Manage your Fly.io apps, machines, volumes, and secrets directly from Agent Hub. Full infrastructure control including machine creation, scaling, configuration updates, and command execution.

## Configuration

### Required Credentials

```json
{
  "apiKeys": {
    "fly_api_token": "FlyV1 fm2_...",
    "fly_org_slug": "personal"
  }
}
```

### Getting Your API Token

Generate a Fly.io API token:

```bash
fly tokens create
```

Or visit [Fly.io Tokens](https://fly.io/dashboard/personal/tokens) in your dashboard.

### Getting Started

1. Generate a Fly.io API token using the command above
2. Configure the token and organization slug in Agent Hub integrations
3. Test the connection to verify credentials

## Available Actions

### App Management

#### flyListApps

List all Fly.io apps in your organization with their status and URLs.

**Parameters:** None

**Example:**

```json
{
  "action": "flyListApps",
  "arguments": {}
}
```

**Response:**

```json
{
  "apps": [
    {
      "id": "catvet-records",
      "name": "catvet-records",
      "status": "deployed",
      "machine_count": 2,
      "url": "https://catvet-records.fly.dev"
    }
  ]
}
```

#### flyGetApp

Get details about a specific Fly.io app including its URL and machine count.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appName` | string | Yes | The name of the Fly.io app |

### Machine Management

#### flyListMachines

List all machines (VMs) running in a Fly.io app with their status, region, and IPs.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appName` | string | Yes | The name of the Fly.io app |

**Response:**

```json
{
  "machines": [
    {
      "id": "7846e45f27e218",
      "name": "young-sound-9626",
      "state": "started",
      "region": "fra",
      "private_ip": "fdaa:0:1234::1"
    }
  ]
}
```

#### flyGetMachine

Get detailed information about a specific machine including its configuration and state.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appName` | string | Yes | The name of the Fly.io app |
| `machineId` | string | Yes | The machine ID |

#### flyCreateMachine

Create a new machine in an app. Can optionally attach a volume and set auto-stop behavior.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appName` | string | Yes | The name of the Fly.io app |
| `name` | string | No | Optional name for the machine |
| `region` | string | No | Region (e.g., "fra", "lax") |
| `volumeId` | string | No | Volume ID to attach |
| `volumePath` | string | No | Mount path (default: "/data") |
| `autoStop` | string | No | "suspend", "stop", or "off" |

**Auto-stop modes:**
- `suspend` - Quick wake (~300ms), preserves memory state
- `stop` - Cold start, loses container filesystem
- `off` - Always running (~$5-7/month)

**Example with volume:**

```json
{
  "action": "flyCreateMachine",
  "arguments": {
    "appName": "catvet-records",
    "region": "fra",
    "volumeId": "vol_abc123",
    "autoStop": "suspend"
  }
}
```

#### flyDeleteMachine

Permanently delete a machine. **WARNING:** Cannot be undone.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appName` | string | Yes | The name of the Fly.io app |
| `machineId` | string | Yes | The machine ID to delete |

#### flyStartMachine

Start a stopped or suspended machine.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appName` | string | Yes | The name of the Fly.io app |
| `machineId` | string | Yes | The machine ID to start |

#### flyStopMachine

Stop a running machine. The machine can be started again later.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appName` | string | Yes | The name of the Fly.io app |
| `machineId` | string | Yes | The machine ID to stop |

#### flyRestartMachine

Restart a machine (stops and starts it). Useful for applying configuration changes.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appName` | string | Yes | The name of the Fly.io app |
| `machineId` | string | Yes | The machine ID to restart |

#### flySuspendMachine

Suspend a machine to save costs. State is preserved and can be resumed quickly.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appName` | string | Yes | The name of the Fly.io app |
| `machineId` | string | Yes | The machine ID to suspend |

#### flyWaitForMachine

Wait for a machine to reach a specific state. Useful after start/stop operations.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appName` | string | Yes | The name of the Fly.io app |
| `machineId` | string | Yes | The machine ID |
| `state` | string | Yes | "started", "stopped", or "suspended" |

### Configuration Updates

#### flyUpdateMachineConfig

Update a machine's configuration including environment variables and resources.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appName` | string | Yes | The name of the Fly.io app |
| `machineId` | string | Yes | The machine ID to update |
| `env` | object | No | Environment variables to set/update |
| `cpus` | number | No | Number of CPUs (1, 2, 4) |
| `memoryMb` | number | No | Memory in MB (256, 512, 1024) |
| `autoStop` | string | No | "suspend", "stop", or "off" |

**Example - Update env vars:**

```json
{
  "action": "flyUpdateMachineConfig",
  "arguments": {
    "appName": "catvet-records",
    "machineId": "7846e45f27e218",
    "env": {
      "NODE_ENV": "production",
      "LOG_LEVEL": "info"
    }
  }
}
```

**Example - Scale resources:**

```json
{
  "action": "flyUpdateMachineConfig",
  "arguments": {
    "appName": "catvet-records",
    "machineId": "7846e45f27e218",
    "cpus": 2,
    "memoryMb": 1024
  }
}
```

### Secrets Management

#### flyListSecrets

List all secrets for a Fly.io app (names only, values are not shown).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appName` | string | Yes | The name of the Fly.io app |

**Response:**

```json
{
  "secrets": [
    { "name": "ANTHROPIC_API_KEY", "digest": "abc123...", "createdAt": "2024-01-15T..." },
    { "name": "OPENCODE_SERVER_PASSWORD", "digest": "def456...", "createdAt": "2024-01-15T..." }
  ]
}
```

#### flySetSecrets

Set secrets for a Fly.io app. Machines must be restarted for new values to take effect.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appName` | string | Yes | The name of the Fly.io app |
| `secrets` | object | Yes | Key-value pairs of secrets |
| `restartMachines` | boolean | No | Auto-restart machines (default: false) |

**Example:**

```json
{
  "action": "flySetSecrets",
  "arguments": {
    "appName": "catvet-records",
    "secrets": {
      "API_KEY": "sk-...",
      "DATABASE_URL": "postgres://..."
    },
    "restartMachines": true
  }
}
```

#### flyUnsetSecrets

Remove secrets from a Fly.io app.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appName` | string | Yes | The name of the Fly.io app |
| `secretNames` | array | Yes | Names of secrets to remove |
| `restartMachines` | boolean | No | Auto-restart machines (default: false) |

**Example:**

```json
{
  "action": "flyUnsetSecrets",
  "arguments": {
    "appName": "catvet-records",
    "secretNames": ["OLD_API_KEY", "DEPRECATED_TOKEN"],
    "restartMachines": true
  }
}
```

### Command Execution

#### flyExecCommand

Execute a command on a running Fly.io machine. Similar to SSH but via API.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appName` | string | Yes | The name of the Fly.io app |
| `machineId` | string | Yes | The machine ID |
| `command` | array | Yes | Command as array (e.g., ["ls", "-la"]) |
| `timeout` | number | No | Timeout in seconds (default: 30, max: 300) |

**Example - List files:**

```json
{
  "action": "flyExecCommand",
  "arguments": {
    "appName": "catvet-records",
    "machineId": "7846e45f27e218",
    "command": ["ls", "-la", "/data/workspace"]
  }
}
```

**Example - Run bash command:**

```json
{
  "action": "flyExecCommand",
  "arguments": {
    "appName": "catvet-records",
    "machineId": "7846e45f27e218",
    "command": ["bash", "-c", "supervisorctl -c /etc/supervisor/conf.d/supervisord.conf restart app"]
  }
}
```

**Response:**

```json
{
  "stdout": "app: stopped\napp: started\n",
  "stderr": "",
  "exit_code": 0
}
```

### Scaling

#### flyScaleMachines

Scale an app to a specific number of machines. For apps **without** volumes.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appName` | string | Yes | The name of the Fly.io app |
| `count` | number | Yes | Target number of machines |
| `region` | string | No | Region for new machines |

#### flyScaleWithVolumes

Scale an app that uses volumes. Creates matching volumes for each new machine.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appName` | string | Yes | The name of the Fly.io app |
| `count` | number | Yes | Target number of machines |
| `region` | string | No | Region for new machines/volumes |
| `volumeSizeGb` | number | No | Size for new volumes (default: 1) |

**Example - Scale to 2 machines with volumes:**

```json
{
  "action": "flyScaleWithVolumes",
  "arguments": {
    "appName": "catvet-records",
    "count": 2,
    "region": "fra"
  }
}
```

### Volume Management

#### flyListVolumes

List all volumes for a Fly.io app.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appName` | string | Yes | The name of the Fly.io app |

**Response:**

```json
{
  "volumes": [
    {
      "id": "vol_r77m35j7kj10613r",
      "name": "catvet_data",
      "size_gb": 1,
      "region": "fra",
      "state": "created",
      "attached_machine_id": "7846e45f27e218"
    }
  ]
}
```

#### flyCreateVolume

Create a new persistent volume.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appName` | string | Yes | The name of the Fly.io app |
| `name` | string | Yes | Volume name (e.g., "data") |
| `region` | string | Yes | Region (must match machine) |
| `sizeGb` | number | No | Size in GB (default: 1) |

#### flyDeleteVolume

Delete a volume. **WARNING:** Permanently deletes all data.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `appName` | string | Yes | The name of the Fly.io app |
| `volumeId` | string | Yes | The volume ID to delete |

## Use Cases

### Full Machine Lifecycle

```
1. flyListApps → Get app list
2. flyCreateVolume → Create storage
3. flyCreateMachine → Create machine with volume
4. flySetSecrets → Configure secrets
5. flyRestartMachine → Apply secrets
6. flyExecCommand → Verify with "ls /data"
```

### Deploy New Sandbox

```json
// 1. Create volume
{
  "action": "flyCreateVolume",
  "arguments": { "appName": "my-sandbox", "name": "data", "region": "fra" }
}

// 2. Create machine with volume
{
  "action": "flyCreateMachine",
  "arguments": {
    "appName": "my-sandbox",
    "volumeId": "vol_xxx",
    "autoStop": "suspend"
  }
}

// 3. Set secrets
{
  "action": "flySetSecrets",
  "arguments": {
    "appName": "my-sandbox",
    "secrets": { "ANTHROPIC_API_KEY": "sk-..." },
    "restartMachines": true
  }
}
```

### Debug a Running Machine

```json
// Check what's running
{
  "action": "flyExecCommand",
  "arguments": {
    "appName": "catvet-records",
    "machineId": "7846e45f27e218",
    "command": ["ps", "aux"]
  }
}

// Check logs
{
  "action": "flyExecCommand",
  "arguments": {
    "appName": "catvet-records",
    "machineId": "7846e45f27e218",
    "command": ["tail", "-n", "50", "/var/log/opencode-err.log"]
  }
}
```

### Scale for High Availability

```json
// Scale to 2 machines with individual volumes
{
  "action": "flyScaleWithVolumes",
  "arguments": {
    "appName": "catvet-records",
    "count": 2,
    "region": "fra"
  }
}
```

## Combining with OpenCode Sandbox

The Fly.io integration works seamlessly with [OpenCode Sandbox](/integrations/opencode-sandbox):

1. **Fly.io** - Infrastructure management (create, scale, configure)
2. **OpenCode Sandbox** - AI coding agent (send prompts, get code changes)

Example workflow:
```
1. flyListApps → Get sandbox URLs
2. opencodeCreateSession → Start coding session
3. opencodeSendPrompt → "Add a new /users endpoint"
4. flyExecCommand → "supervisorctl restart app"
5. Test the new endpoint at sandbox URL
```

## Related

- [OpenCode Sandbox Integration](/integrations/opencode-sandbox)
- [Integrations Overview](/integrations/overview)
- [Fly.io Machines API](https://fly.io/docs/machines/api/)
