export const quickCards = [
  {
    title: 'Scan multi-manager',
    description: 'Detecte les applications installees via APT, Snap, Flatpak, Pacman et DNF.',
  },
  {
    title: 'Snapshots JSON',
    description: 'Genere des sauvegardes lisibles, horodatees et compressibles en .json.gz.',
  },
  {
    title: 'GitHub Storage',
    description: 'Synchronise les snapshots vers un depot prive avec token configure localement.',
  },
];

export const tuiScreens = [
  { title: 'Dashboard', description: 'Vue synthetique des derniers snapshots et de l etat de configuration.' },
  { title: 'Backup', description: 'Selection des gestionnaires, label, compression et push GitHub.' },
  { title: 'Restore', description: 'Liste des snapshots, preview, verification espace disque et dry-run.' },
  { title: 'Add App', description: 'Ajout manuel avec nom, version, gestionnaire et fichiers de config.' },
  { title: 'Settings', description: 'Edition ergonomique de config.yaml sans manipuler le fichier a la main.' },
];

export const compatItems = [
  { name: 'Ubuntu/Debian', manager: 'apt', ok: true },
  { name: 'Fedora', manager: 'dnf', ok: true },
  { name: 'Arch', manager: 'pacman', ok: true },
  { name: 'Snap', manager: 'snap', ok: true },
  { name: 'Flatpak', manager: 'flatpak', ok: true },
];

export const commands = [
  {
    id: 'backup',
    title: 'backup',
    description: 'Scanne les applications installees et genere un snapshot JSON local ou compresse.',
    signature: 'recovery-tui backup [OPTIONS]',
    params: [
      ['--label, -l', 'string', 'optionnel', 'Nom du snapshot. Timestamp automatique si absent.'],
      ['--output, -o', 'path', 'optionnel', 'Dossier de destination des snapshots locaux.'],
      ['--compress', 'flag', 'optionnel', 'Compresse le snapshot en .json.gz.'],
      ['--github', 'flag', 'optionnel', 'Pousse le snapshot vers GitHub apres la sauvegarde locale.'],
      ['--managers', 'csv', 'optionnel', 'Restreint le scan a apt,snap,flatpak,pacman,dnf.'],
    ],
    examples: `recovery-tui backup
recovery-tui backup --label "ubuntu-22.04" --compress
recovery-tui backup --managers apt,snap --github
recovery-tui backup --output /mnt/backup/`,
  },
  {
    id: 'restore',
    title: 'restore',
    description: 'Installe les applications d un snapshot sur le systeme courant.',
    signature: 'recovery-tui restore [SNAPSHOT] [OPTIONS]',
    params: [
      ['SNAPSHOT', 'path', 'optionnel', 'Fichier JSON ou JSON.GZ a restaurer.'],
      ['--snapshot-label, -s', 'string', 'optionnel', 'Selection par label partiel.'],
      ['--dry-run', 'flag', 'optionnel', 'Simule les installations sans modifier le systeme.'],
      ['--force', 'flag', 'optionnel', 'Reinstalle meme si une application semble deja presente.'],
      ['--skip-confirm', 'flag', 'optionnel', 'Ignore la confirmation interactive.'],
    ],
    examples: `recovery-tui restore
recovery-tui restore --dry-run
recovery-tui restore ./snapshot_ubuntu-22.04.json
recovery-tui restore -s "avant-migration" --skip-confirm
recovery-tui restore --force --skip-confirm`,
  },
  {
    id: 'list',
    title: 'list',
    description: 'Liste les snapshots locaux et expose une sortie JSON exploitable en script.',
    signature: 'recovery-tui list [--json-output]',
    params: [
      ['--json-output', 'flag', 'optionnel', 'Retourne une liste JSON au lieu du rendu console.'],
    ],
    examples: `recovery-tui list
recovery-tui list --json-output | jq '.[0]'`,
  },
  {
    id: 'config',
    title: 'config',
    description: 'Lit et modifie la configuration persistante du projet.',
    signature: 'recovery-tui config <get|set|show>',
    params: [
      ['config get KEY', 'read', 'requis', 'Lit une valeur avec notation pointee.'],
      ['config set KEY VALUE', 'write', 'requis', 'Ecrit une valeur et persiste config.yaml.'],
      ['config show', 'read', 'requis', 'Affiche toute la configuration YAML.'],
    ],
    examples: `recovery-tui config set github.token ghp_xxxxxxxxxxxx
recovery-tui config set github.repo monuser/mes-apps
recovery-tui config get storage.type
recovery-tui config show`,
  },
];

export const coreSections = [
  {
    id: 'scanner',
    title: 'Scanner - core/scanner.py',
    description: 'Le scanner produit des entrees normalisees pour chaque gestionnaire de paquets.',
    code: `AppEntry = {
  "name": str,
  "version": str,
  "manager": "apt" | "snap" | "flatpak" | "pacman" | "dnf",
  "installed_at": str | None,
  "config_files": list,
}`,
  },
  {
    id: 'snapshots',
    title: 'Snapshots - core/backup.py',
    description: 'Les snapshots sont construits, sauvegardes, charges et listes via une API Python dediee.',
    code: `from recovery_tui.core.backup import build_snapshot, save_snapshot, load_snapshot
from recovery_tui.storage.local import save_local, list_local_snapshots

snapshot = build_snapshot(apps, label="test", compress=False)
path = save_snapshot(snapshot)
data = load_snapshot(path)
snaps = list_local_snapshots()`,
  },
];

export const configYaml = `storage:
  type: local
  local_path: ~/.local/share/recovery-tui/snapshots

github:
  token: null
  repo: null
  branch: main

backup:
  default_managers: [apt, snap, flatpak, pacman, dnf]
  compress: false
  include_config_files: true

restore:
  dry_run_default: false
  check_disk_space: true`;

export const errorItems = [
  {
    title: 'Command recovery-tui not found',
    description: 'Le package n est pas installe dans le bon virtualenv. Activez .venv puis relancez pip install -e .',
  },
  {
    title: 'Permission denied pendant restore',
    description: 'Certaines installations demandent sudo. Relancez avec les droits adaptes ou utilisez --dry-run avant.',
  },
  {
    title: 'GitHub token not configured',
    description: 'Configurez github.token et github.repo via recovery-tui config set avant d utiliser --github.',
  },
];
