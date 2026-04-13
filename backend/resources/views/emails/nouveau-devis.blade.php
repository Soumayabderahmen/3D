<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nouvelle demande de devis</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 0; }
    .wrapper { max-width: 620px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,.08); }
    .header { background: linear-gradient(135deg, #1a3c5e 0%, #2563eb 100%); padding: 32px 40px; }
    .header h1 { color: #fff; font-size: 22px; margin: 0; font-weight: 700; }
    .header p { color: rgba(255,255,255,.75); margin: 6px 0 0; font-size: 14px; }
    .badges { display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; }
    .badge { display: inline-block; background: rgba(255,255,255,.15); color: #fff; border-radius: 999px; padding: 3px 14px; font-size: 12px; font-weight: 600; }
    .badge.urgent { background: #ef4444; }
    .body { padding: 32px 40px; }
    .section-title { font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .08em; margin: 0 0 12px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
    .card { background: #f8fafc; border-radius: 8px; padding: 12px 16px; }
    .card-label { font-size: 11px; color: #9ca3af; margin-bottom: 3px; }
    .card-value { font-size: 14px; font-weight: 600; color: #111827; }
    .divider { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
    .message-box { background: #f8fafc; border-left: 4px solid #2563eb; border-radius: 0 8px 8px 0; padding: 16px 20px; font-size: 14px; color: #374151; line-height: 1.7; white-space: pre-line; }
    .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
    .row { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 12px; }
    .label { font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .06em; min-width: 80px; padding-top: 2px; }
    .value { font-size: 14px; color: #111827; font-weight: 500; }
    .value a { color: #2563eb; text-decoration: none; }
    .cta { text-align: center; margin: 28px 0 8px; }
    .cta a { background: #2563eb; color: #fff; padding: 12px 28px; border-radius: 999px; text-decoration: none; font-weight: 700; font-size: 14px; margin: 0 6px; display: inline-block; }
    .cta a.secondary { background: #fff; color: #2563eb; border: 2px solid #2563eb; }
    .footer { background: #f9fafb; padding: 18px 40px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
    @media (max-width: 480px) { .grid, .contact-grid { grid-template-columns: 1fr; } .body, .header { padding: 24px 20px; } }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>📋 Nouvelle demande de devis</h1>
      <p>Reçue le {{ $devis->created_at->format('d/m/Y à H:i') }}</p>
      <div class="badges">
        <span class="badge">{{ $devis->service_label }}</span>
        <span class="badge">{{ $devis->place_label }}</span>
        @if($devis->urgent)
          <span class="badge urgent">⚡ URGENT</span>
        @endif
      </div>
    </div>

    <div class="body">

      <!-- Prestation -->
      <p class="section-title">Prestation demandée</p>
      <div class="grid">
        <div class="card">
          <div class="card-label">Service</div>
          <div class="card-value">{{ $devis->service_label }}</div>
        </div>
        <div class="card">
          <div class="card-label">Type de lieu</div>
          <div class="card-value">{{ $devis->place_label }}</div>
        </div>
        @if($devis->volume)
        <div class="card">
          <div class="card-label">Volume estimé</div>
          <div class="card-value">{{ $devis->volume }}</div>
        </div>
        @endif
        @if($devis->departement)
        <div class="card">
          <div class="card-label">Département</div>
          <div class="card-value">{{ $devis->departement }}</div>
        </div>
        @endif
        @if($devis->date_souhaitee)
        <div class="card">
          <div class="card-label">Date souhaitée</div>
          <div class="card-value">{{ $devis->date_souhaitee->format('d/m/Y') }}</div>
        </div>
        @endif
        <div class="card">
          <div class="card-label">Urgence</div>
          <div class="card-value">{{ $devis->urgent ? '⚡ Oui' : 'Non' }}</div>
        </div>
      </div>

      <hr class="divider" />

      <!-- Contact -->
      <p class="section-title">Coordonnées</p>
      <div class="row">
        <span class="label">Nom</span>
        <span class="value">{{ $devis->prenom }} {{ $devis->nom }}</span>
      </div>
      <div class="row">
        <span class="label">Téléphone</span>
        <span class="value"><a href="tel:{{ $devis->tel }}">{{ $devis->tel }}</a></span>
      </div>
      <div class="row">
        <span class="label">Email</span>
        <span class="value"><a href="mailto:{{ $devis->email }}">{{ $devis->email }}</a></span>
      </div>

      @if($devis->message)
        <hr class="divider" />
        <p class="section-title">Message</p>
        <div class="message-box">{{ $devis->message }}</div>
      @endif

      <div class="cta">
        <a href="mailto:{{ $devis->email }}">Répondre par email</a>
        <a href="tel:{{ $devis->tel }}" class="secondary">Appeler</a>
      </div>
    </div>

    <div class="footer">
      3D Service France — Notification automatique · Ne pas répondre à cet email
    </div>
  </div>
</body>
</html>
