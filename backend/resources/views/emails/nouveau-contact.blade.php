<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nouveau contact</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,.08); }
    .header { background: linear-gradient(135deg, #1a3c5e 0%, #2563eb 100%); padding: 32px 40px; }
    .header h1 { color: #fff; font-size: 22px; margin: 0; font-weight: 700; }
    .header p { color: rgba(255,255,255,.75); margin: 6px 0 0; font-size: 14px; }
    .badge { display: inline-block; background: rgba(255,255,255,.15); color: #fff; border-radius: 999px; padding: 2px 12px; font-size: 12px; margin-top: 12px; }
    .body { padding: 32px 40px; }
    .row { display: flex; gap: 12px; margin-bottom: 16px; align-items: flex-start; }
    .label { font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .06em; min-width: 90px; padding-top: 2px; }
    .value { font-size: 15px; color: #111827; font-weight: 500; }
    .value a { color: #2563eb; text-decoration: none; }
    .divider { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
    .message-box { background: #f8fafc; border-left: 4px solid #2563eb; border-radius: 0 8px 8px 0; padding: 16px 20px; font-size: 14px; color: #374151; line-height: 1.7; white-space: pre-line; }
    .cta { text-align: center; margin: 28px 0 8px; }
    .cta a { background: #2563eb; color: #fff; padding: 12px 28px; border-radius: 999px; text-decoration: none; font-weight: 700; font-size: 14px; }
    .footer { background: #f9fafb; padding: 18px 40px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>📬 Nouveau message de contact</h1>
      <p>Reçu le {{ $contact->created_at->format('d/m/Y à H:i') }}</p>
      @if($contact->sujet)
        <span class="badge">{{ $contact->sujet }}</span>
      @endif
    </div>
    <div class="body">
      <div class="row">
        <span class="label">Prénom</span>
        <span class="value">{{ $contact->prenom }}</span>
      </div>
      @if($contact->nom)
      <div class="row">
        <span class="label">Nom</span>
        <span class="value">{{ $contact->nom }}</span>
      </div>
      @endif
      <div class="row">
        <span class="label">Téléphone</span>
        <span class="value"><a href="tel:{{ $contact->tel }}">{{ $contact->tel }}</a></span>
      </div>
      <div class="row">
        <span class="label">Email</span>
        <span class="value"><a href="mailto:{{ $contact->email }}">{{ $contact->email }}</a></span>
      </div>
      @if($contact->message)
        <hr class="divider" />
        <p style="font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;">Message</p>
        <div class="message-box">{{ $contact->message }}</div>
      @endif
      <div class="cta">
        <a href="mailto:{{ $contact->email }}">Répondre par email</a>
      </div>
    </div>
    <div class="footer">
      3D Service France — Notification automatique · Ne pas répondre à cet email
    </div>
  </div>
</body>
</html>
