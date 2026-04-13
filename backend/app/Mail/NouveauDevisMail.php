<?php

namespace App\Mail;

use App\Models\Devis;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NouveauDevisMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly Devis $devis
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '📋 Nouvelle demande de devis — ' . $this->devis->prenom . ' ' . $this->devis->nom,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.nouveau-devis',
            with: ['devis' => $this->devis],
        );
    }
}
