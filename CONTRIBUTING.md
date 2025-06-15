# Contributing to Jabberwocky

Thank you for considering contributing! Here’s how you can help:

## How to Contribute

1. **Fork the repository** and create your branch from `main`.
2. **Make your changes** with clear, descriptive commits.
3. **Test your work** before submitting.
4. **Submit a pull request** (PR) and briefly describe your changes.

## Code Style

- Use clear, readable code.
- Follow existing formatting and naming conventions.

## Security Considerations

- All sensitive data is handled only in the browser; nothing is sent to any server.
- If you add API calls or integrations:
  - Never expose secrets or private keys in the frontend or repo.
  - Document required environment variables in `.env.example`.
  - Always validate/sanitize data before display.
- If adding extension scripts or a backend:
  - Use restrictive Content Security Policies.
  - Limit permissions in your browser extension manifest.
  - See [OWASP security best practices](https://owasp.org/www-project-top-ten/) for more details.

## Issues & Questions

Open an issue if you spot a bug or have a feature request.

Thanks for helping improve Jabberwocky!
