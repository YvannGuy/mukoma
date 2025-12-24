-- Table des achats
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  buyer_email TEXT NOT NULL,
  stripe_session_id TEXT UNIQUE NOT NULL,
  product_id TEXT NOT NULL DEFAULT 'ebook-standard',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des logs de téléchargement
CREATE TABLE IF NOT EXISTS download_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_id UUID NOT NULL REFERENCES purchases(id) ON DELETE CASCADE,
  buyer_email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_purchases_buyer_email ON purchases(buyer_email);
CREATE INDEX IF NOT EXISTS idx_purchases_stripe_session_id ON purchases(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_download_logs_purchase_id ON download_logs(purchase_id);
CREATE INDEX IF NOT EXISTS idx_download_logs_created_at ON download_logs(created_at);

-- RLS Policies pour purchases
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs peuvent voir leurs propres achats
CREATE POLICY "Users can view their own purchases"
  ON purchases
  FOR SELECT
  USING (
    auth.uid() = user_id OR
    buyer_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Seul le service role peut insérer (via webhook)
CREATE POLICY "Service role can insert purchases"
  ON purchases
  FOR INSERT
  WITH CHECK (true);

-- RLS Policies pour download_logs
ALTER TABLE download_logs ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs peuvent voir leurs propres logs
CREATE POLICY "Users can view their own download logs"
  ON download_logs
  FOR SELECT
  USING (
    buyer_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Seul le service role peut insérer
CREATE POLICY "Service role can insert download logs"
  ON download_logs
  FOR INSERT
  WITH CHECK (true);

-- Fonction pour vérifier l'accès à un achat par email
CREATE OR REPLACE FUNCTION check_purchase_access(check_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM purchases
    WHERE buyer_email = LOWER(check_email)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

